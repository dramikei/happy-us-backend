import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, UserType } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserService } from '../user/user.service';
import { VolunteerService } from '../volunteer/volunteer.service';
import { UserDocument } from '../user/entities/user.entity';
import { VolunteerDocument } from '../volunteer/entities/volunteer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly volunteerService: VolunteerService,
  ) {}

  login(loginDto: LoginDto) {
    // bcrypt.compareSync(loginDto.password, hash);
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
    const salt = bcrypt.genSaltSync(12);
    const baseUserFields = {
      age: registerDto.age,
      fcmToken: registerDto.fcmToken,
      password: bcrypt.hashSync(registerDto.password, salt),
      social: registerDto.social,
      username: registerDto.username,
    };

    const createdEntity: UserDocument | VolunteerDocument =
      registerDto.type === UserType.user
        ? await this.userService.create({
            ...baseUserFields,
            posts: [],
          })
        : await this.volunteerService.create({ ...baseUserFields });

    createdEntity.password = 'lol, it hidden from response HACKERRR';
    return { newUser: createdEntity, accessToken: 'tbd' };
  }

  changePassword(id: string, changePasswordDto: ChangePasswordDto) {
    return `This action updates a #${id} auth`;
  }

  logout(id: string) {
    return `This action removes a #${id} auth`;
  }
}
