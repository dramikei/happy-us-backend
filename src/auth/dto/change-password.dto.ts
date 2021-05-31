import { IsEnum, IsNotEmpty, Length } from 'class-validator';
import { UserType } from './login.dto';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @IsNotEmpty()
  @Length(6)
  oldPassword: string;

  @IsNotEmpty()
  @Length(6)
  newPassword: string;
}
