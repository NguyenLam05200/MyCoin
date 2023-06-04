import { Body, Controller, Get, Post } from '@nestjs/common';
import { MycoinService } from './mycoin.service';

@Controller('mycoin')
export class MycoinController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly mycoinService: MycoinService) { }

  @Get('integration')
  async integration() {
    return await this.mycoinService.integration()
  }

  @Get()
  async test() {
    return { statusCode: 200, data: await this.mycoinService.test() }
  }

  @Get('test')
  async createAccount() {
    return await this.mycoinService.createAccount();
  }

  @Get('genesis-mockup')
  async mockupGenesis() {
    return await this.mycoinService.mockupGenesis();
  }

  @Get('send')
  async sendToken() {
    return await this.mycoinService.sendToken();
  }
}
