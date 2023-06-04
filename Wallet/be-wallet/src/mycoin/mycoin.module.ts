import { Module } from '@nestjs/common';
import { MycoinController } from './mycoin.controller';
import { MycoinService } from './mycoin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/schemas/account.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }])
  ],
  controllers: [MycoinController],
  providers: [MycoinService],
})
export class MycoinModule { }
