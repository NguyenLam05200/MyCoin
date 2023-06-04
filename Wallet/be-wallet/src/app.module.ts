import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { MycoinController } from './mycoin/mycoin.controller';
import { MycoinService } from './mycoin/mycoin.service';
import { MycoinModule } from './mycoin/mycoin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB),
    AccountModule,
    MycoinModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
