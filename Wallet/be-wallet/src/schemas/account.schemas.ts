import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
    @Prop({ required: true, unique: true })
    mnemonic: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    password: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);