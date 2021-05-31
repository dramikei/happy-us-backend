import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserService } from '../user/user.service';
import { VolunteerService } from '../volunteer/volunteer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly volunteerService: VolunteerService,
  ) {}

  login(createAuthDto: LoginDto) {
    return 'This action adds a new auth';
  }

  register(registerDto: RegisterDto) {
    return `This action returns all auth`;
  }

  changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    return `This action updates a #${id} auth`;
  }

  logout(id: number) {
    return `This action removes a #${id} auth`;
  }
}
