import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from './login.dto';

export class RegisterDto {
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;
}
