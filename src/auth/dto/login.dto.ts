import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export enum UserType {
  volunteer = 'volunteer',
  user = 'user',
}

export class LoginDto {
  @IsNotEmpty()
  @Length(2)
  username: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @IsOptional()
  @IsString()
  fcmToken: string;
}
