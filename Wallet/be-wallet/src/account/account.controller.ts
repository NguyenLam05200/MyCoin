import { Body, Controller, Get, Post } from '@nestjs/common';
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
    return { statusCode: 200, data: await this.accountService.generateMnemonic() }
  }

  @Post('create')
  async createPost(@Body() body: { account_name: string, password: string, mnemonic: string }) {
    return { statusCode: 200, data: await this.accountService.create(body) }
  }
}
