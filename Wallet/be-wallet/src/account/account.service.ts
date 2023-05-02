import { Injectable } from '@nestjs/common';
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
      isExist = !!(await this.accountModel.exists({ mnemonic: getHash(mnemonic) }))
    }
    return mnemonic
  }


  async create(createAccountDto): Promise<Account> {
    const createdCat = new this.accountModel(createAccountDto);
    return createdCat.save();
  }
}
