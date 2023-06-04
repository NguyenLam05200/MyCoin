import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/account.schemas';
import { Model } from 'mongoose';
import * as bip39 from 'bip39';
import { decrypt, encrypt, getHash } from 'src/utils';
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx"
import { Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx"


import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { getOfflineSigner } from "@cosmostation/cosmos-client";

import { makeCosmoshubPath, pubkeyToAddress } from "@cosmjs/amino"

import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { IndexedTx, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import * as fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const logsFilePath = 'logs.txt';

const apiURL = "http://0.0.0.0:1317";
const rpcURL = "http://0.0.0.0:26657";
const prefix = "cosmos";

// const rpc = "http://0.0.0.0:26657"
const rpc = "https://rpc.sentry-01.theta-testnet.polypore.xyz"


@Injectable()
export class MycoinService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async integration() {
    let logs = '';
    const buckets = [];

    for (let i = 0; i < 100; i++) {
      const wallet: DirectSecp256k1HdWallet = await DirectSecp256k1HdWallet.generate(24);
      const name = `mock_${i + 1}`;
      const coins = ['0token', '0stake'];
      const mnemonic = wallet.mnemonic;
      const encryptedMnemonic = encrypt(wallet.mnemonic);
      const accounts = await wallet.getAccounts();

      logs += `- name: ${name}\n  coins: ${JSON.stringify(coins)}\n  mnemonic: ${mnemonic}\n`;

      buckets.push({
        name,
        coins,
        mnemonic: encryptedMnemonic,
        accounts,
      });
    }

    await this.accountModel.insertMany(buckets);
    await writeFileAsync(logsFilePath, logs);
    console.log(`Buckets and logs have been created and saved.`);
  }

  async createAccount() {
    const mnemonic = "steel throw garbage dish sing dirt over smile impact lab hybrid dust soda fatal modify isolate black pistol major crane hollow cloth alien husband";
    const hdPath = makeCosmoshubPath(0);

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix, hdPaths: [hdPath] });
    const [account] = await wallet.getAccounts();

    console.log("Account address:", account.address);
    console.log("Account public key:", account.pubkey);

    const client = await StargateClient.connect(rpcURL)
    console.log("With client, chain id:", await client.getChainId(), ", height:", await client.getHeight())

    const balance = await client.getAllBalances(account.address)
    console.log("balance: ", balance);
  }

  async test() {
    const client = await StargateClient.connect(rpcURL)
    console.log("With client, chain id:", await client.getChainId(), ", height:", await client.getHeight())
    console.log(
      "Alice balances:",
      await client.getAllBalances("cosmos1qh3ay0j6u8nysmpksmkpnh3h4ny83zrgw9wwa4")
    )
    const faucetTx: IndexedTx = (await client.getTx(
      "540484BDD342702F196F84C2FD42D63FA77F74B26A8D7383FAA5AB46E4114A9B"
    ))!
    console.log("Faucet Tx:", faucetTx)
    // const decodedTx: Tx = Tx.decode(faucetTx.tx)
    // console.log("DecodedTx:", decodedTx)
    // console.log("Decoded messages:", decodedTx.body!.messages)
    // const sendMessage: MsgSend = MsgSend.decode(decodedTx.body!.messages[0].value)
    // console.log("Sent message:", sendMessage)
    // const faucet: string = sendMessage.fromAddress
    // console.log("Faucet balances:", await client.getAllBalances(faucet))

    // // Get the faucet address another way
    // {
    //   const rawLog = JSON.parse(faucetTx.rawLog)
    //   console.log("Raw log:", JSON.stringify(rawLog, null, 4))
    //   const faucet: string = rawLog[0].events
    //     .find((eventEl: any) => eventEl.type === "coin_spent")
    //     .attributes.find((attribute: any) => attribute.key === "spender").value
    //   console.log("Faucet address from raw log:", faucet)
    // }
  }

  async mockupGenesis() {
    for (let i = 0; i < 2; i++) {
      const wallet: DirectSecp256k1HdWallet = await DirectSecp256k1HdWallet.generate(24)
      console.log(`- name: mock_${i + 1}`)
      console.log(`  coins: [0token, 0stake]`)
      console.log(`  mnemonic: ${wallet.mnemonic}`)
      // process.stdout.write(wallet.mnemonic)
      // const accounts = await wallet.getAccounts()
      // console.error("Mnemonic with 1st account:", accounts[0].address)
    }
  }

  async createClient(endpoint, wallet, signerAddress) {
    const client = await SigningCosmWasmClient.connectWithSigner(endpoint, wallet, signerAddress);
    return client;
  }


  async sendToken() {
    const mnemonic = "gossip blush rebuild virus term illness crew lounge peasant donate total label nominee enlist merge despair upon beyond weasel peasant token cliff diesel sound";
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const [firstAccount] = await wallet.getAccounts();

    // const rpcEndpoint = "https://rpc.my_tendermint_rpc_node";
    const client = await SigningStargateClient.connectWithSigner(rpcURL, wallet);

    const recipient = "cosmos1j79ycd89wve0qhvp5e2238e0ly4nscq7x4azz9";
    const amount = {
      denom: "token",
      amount: "1",
    };
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
    const result = await client.sendTokens(firstAccount.address, recipient, [amount], fee, memo);
    // assertIsBroadcastTxSuccess(result);
    console.log("_______result: ", result);

  }
}


/**
 * 
- name: TestAccountName
  coins: [10000token, 100000000stake]
  mnemonic: gossip blush rebuild virus term illness crew lounge peasant donate total label nominee enlist merge despair upon beyond weasel peasant token cliff diesel sound
  Account address: cosmos1hatefl5py0lumz4psjzp35qf74uc4kte4ytxw3
  "balances": [
    {
      "denom": "stake",
      "amount": "100000000"
    },
    {
      "denom": "token",
      "amount": "10000"
    }
  ],

- name: mock_1
  coins: [0token, 0stake]
  mnemonic: balcony common bag snake captain edge draw present fun elephant fresh diamond armed pact print neglect surface slender spatial refuse uphold actress orient check
  Account address: cosmos1r4lq67p8y68eswy9r07jfswzvhsmtmzank5tvj
  "balances": [],


- name: mock_2
  coins: [0token, 0stake]
  mnemonic: steel throw garbage dish sing dirt over smile impact lab hybrid dust soda fatal modify isolate black pistol major crane hollow cloth alien husband
  Account address: cosmos16qwvguqexcjgpnuzc08tesf578vc7jn3m54zxe
  "balances": [
    {
      "denom": "token",
      "amount": "10"
    }
  ],
 */