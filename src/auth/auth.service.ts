import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, UserType } from './dto/login.dto';
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

  async register(registerDto: RegisterDto) {
    if (
      registerDto.type === UserType.volunteer &&
      registerDto.adminToken !== process.env.AdminToken
    ) {
      throw new HttpException(
        'Only admin can create a new volunteer',
        HttpStatus.FORBIDDEN,
      );
    }

    const baseUserFields = {
      age: registerDto.age,
      fcmToken: registerDto.fcmToken,
      password: registerDto.password,
      social: registerDto.social,
      username: registerDto.username,
    };

    const createdEntity =
      registerDto.type === UserType.user
        ? await this.userService.create({
            ...baseUserFields,
            posts: [],
          })
        : await this.volunteerService.create({ ...baseUserFields });

    return { newUser: createdEntity, accessToken: 'tbd' };
  }

  changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    return `This action updates a #${id} auth`;
  }

  logout(id: string) {
    return `This action removes a #${id} auth`;
  }
}
