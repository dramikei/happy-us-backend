import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsFirebasePushId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserType } from './login.dto';
import { Prop } from '@nestjs/mongoose';

export class RegisterDto {
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @IsOptional()
  adminToken: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsFirebasePushId()
  fcmToken: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsObject()
  social: {
    snapchatId?: string;
    discordId?: string;
  };

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @ArrayUnique()
  @Prop({ type: [{ type: String }], required: true })
  hobbies: string[];

  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: String, required: true })
  aboutMe: string;

  @IsOptional()
  @IsNotEmpty()
  @Prop({ type: String, required: true })
  imageUrl: string;
}
