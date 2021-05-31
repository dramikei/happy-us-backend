import { IsEnum, IsNotEmpty, Length } from 'class-validator';

export enum UserType {
  volunteer = 'volunteer',
  user = 'user',
}

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(6)
  password: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
