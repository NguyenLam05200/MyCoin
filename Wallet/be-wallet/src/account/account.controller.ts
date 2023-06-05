import { Body, Param, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Post('login')
  async login(@Body() body: { account_name: string, password: string }) {
    return { statusCode: 200, data: await this.accountService.login(body) }
  }

  @Post('transfer')
  async transfer(@Body() body: { token: string, network: string, amount: number, address: string }) {
    return { statusCode: 200, data: await this.accountService.transfer(body) }
  }

  @Get('refetch-user')
  async refetchUser(@Query() query: { mnemonic: string }) {
    return { statusCode: 200, data: await this.accountService.refetchUser(query) }
  }

  @Post('faucet')
  async faucet(@Body() body: { token: string, amount: number, address: string }) {
    return { statusCode: 200, data: await this.accountService.faucet(body) }
  }
}
