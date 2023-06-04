import { AccountData, Algo } from '@cosmjs/amino';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ required: true, unique: true })
    mnemonic: string;

    @Prop({ required: true })
    accounts: AccountData[]

    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);