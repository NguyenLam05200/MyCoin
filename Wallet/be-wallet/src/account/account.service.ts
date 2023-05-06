import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from 'src/schemas/account.schemas';
import { Model } from 'mongoose';
import * as bip39 from 'bip39';
import { getHash } from 'src/utils';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }


  async generateMnemonic() {
    let isExist: boolean = true;
    let mnemonic: string = "";
    while (isExist) {
      mnemonic = bip39.generateMnemonic();
      isExist = !!(await this.accountModel.exists({ mnemonic }))
    }
    return mnemonic
  }


  async create(input): Promise<Account> {
    const { mnemonic, account_name: name, password } = input
    const isExist = !!(await this.accountModel.exists({ mnemonic }))
    if (isExist) throw new HttpException("This mnemonic is already exists!", 200)

    const createdCat = new this.accountModel({ mnemonic, name, password: await getHash(password) });

    return createdCat.save();
  }
}
