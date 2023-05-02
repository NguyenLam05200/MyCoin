import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as bip39 from 'bip39';

@Controller()
export class AppController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {

    return this.appService.getHello();
  }

  @Get('generate')
  generateMnemonic(): string {
    const mnemonic = bip39.generateMnemonic();
    return mnemonic;
  }
}
