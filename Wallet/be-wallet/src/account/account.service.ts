import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/account.schemas';
import { Model } from 'mongoose';
import * as bip39 from 'bip39';
import { decrypt, encrypt, getHash } from 'src/utils';
import { compareHash } from 'src/utils';
import { IndexedTx, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import fetch from 'node-fetch'

const rpcURL = "http://0.0.0.0:26657";
const faucetUrl = 'http://0.0.0.0:4500'


@Injectable()
export class AccountService {
  private client: StargateClient;
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {
    this.init();
  }

  private async init() {
    this.client = await StargateClient.connect(rpcURL);
  }


  async generateMnemonic() {
    try {
      const randomAccount = await this.accountModel.aggregate([{ $match: { password: null } }, { $sample: { size: 1 } }]).exec();
      const mnemonic = decrypt(randomAccount[0].mnemonic)
      return mnemonic
    } catch (error) {
      throw new HttpException("MyCoin block chain is Full, please contact admin!", 200)
    }
  }

  async create(input): Promise<Account> {
    const { mnemonic, account_name: name, password } = input
    const curAccount = await this.accountModel.findOne({ mnemonic: encrypt(mnemonic), password: null })
    if (!curAccount) throw new HttpException("Invalid mnemonic!", 200)

    curAccount.name = name;
    curAccount.password = await getHash(password)
    await curAccount.save();
    delete curAccount.password
    return curAccount
  }

  async login(input): Promise<any> {
    const { account_name: name, password } = input
    const curAccount = await this.accountModel.findOne({ name })

    if (!curAccount || !compareHash(password, curAccount.password)) throw new HttpException("Invalid username or password!", 200)

    delete curAccount.password

    const balances = await this.client.getAllBalances(curAccount?.accounts[0]?.address)

    console.log("___balances: ", balances);
    return { ...curAccount['_doc'], balances }
  }

  async refetchUser(input): Promise<any> {
    const { mnemonic } = input

    const curAccount = await this.accountModel.findOne({ mnemonic })

    delete curAccount.password

    const balances = await this.client.getAllBalances(curAccount?.accounts[0]?.address)

    return { ...curAccount['_doc'], balances }
  }

  async transfer(input): Promise<any> {
    try {
      const { mnemonic, token, network, amount, address: recipient } = input

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(decrypt(mnemonic));
      const [firstAccount] = await wallet.getAccounts();

      // const rpcEndpoint = "https://rpc.my_tendermint_rpc_node";
      const client = await SigningStargateClient.connectWithSigner(rpcURL, wallet);

      const fee = {
        amount: [
          {
            denom: "stake",
            amount: "1",
          },
        ],
        gas: "180000", // 180k
      };
      const memo = "Use your power wisely";

      const result = await client.sendTokens(firstAccount.address, recipient, [{
        denom: token.toLowerCase(),
        amount: amount,
      }], fee, memo);

      return result;
    } catch (error) {
      console.log("____error: ", error);
      throw new HttpException("Transfer failure!", 200)
    }
  }

  async faucet(input: { token: string, amount: number, address: string }) {
    const { token, amount, address } = input

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const data = {
      address,
      coins: [`${amount}${token}`]
    };

    try {
      const response = await fetch(faucetUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log("____result: ", result);

      return result || true
    } catch (error) {
      console.error(error);
      throw new HttpException("Faucet failure!", 200)
    }
  }
}
