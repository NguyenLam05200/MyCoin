import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/account.schemas';
import { Model } from 'mongoose';
import * as bip39 from 'bip39';
import { decrypt, encrypt, getHash } from 'src/utils';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }


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
    return curAccount
  }
}
