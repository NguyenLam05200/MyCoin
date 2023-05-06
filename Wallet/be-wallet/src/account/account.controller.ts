import { Controller, Get } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly accountService: AccountService) { }

  @Get()
  getHello(): string {
    return "Hello from account controller"
  }

  @Get('generate')
  async generateMnemonic() {
    return { data: await this.accountService.generateMnemonic() }
  }

  @Get('create')
  createNewAccount() {
    const newAccount = {
      mnemonic: "Temp"
      , name: "Test name"
      , password: "Test password"
    }
    return this.accountService.create(newAccount)
  }
}
