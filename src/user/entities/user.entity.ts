import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {
  IsArray,
  IsFirebasePushId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class Base {
  @IsNotEmpty()
  @IsString()
  @Prop({ type: String, required: true })
  username: string;

  @IsOptional()
  @IsFirebasePushId()
  @Prop({ type: String })
  fcmToken: string;

  @IsNotEmpty()
  @Length(6)
  @Prop({ type: String, required: true })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ type: Number, required: true })
  age: number;

  @IsNotEmpty()
  @IsObject()
  @Prop({ type: Object, required: true })
  social: {
    snapchatId?: string;
    discordId?: string;
  };
}

@Schema()
export class User extends Base {
  @IsNotEmpty()
  @IsArray()
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    default: [],
  })
  posts: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
