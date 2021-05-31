import {
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
}
