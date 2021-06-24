import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, UserType } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserService } from '../user/user.service';
import { VolunteerService } from '../volunteer/volunteer.service';
import { UserDocument } from '../user/entities/user.entity';
import { VolunteerDocument } from '../volunteer/entities/volunteer.entity';
import { AuthInfo } from './auth.middleware';
import { getTokens } from '../utils/get-tokens';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly volunteerService: VolunteerService,
  ) {}

  async login(loginDto: LoginDto) {
    const authenticatedEntity =
      loginDto.type === UserType.user
        ? await this.userService.findByUsername(loginDto.username)
        : await this.volunteerService.findByUsername(loginDto.username);
    if (!authenticatedEntity) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }
    const passwordCorrect = bcrypt.compareSync(
      loginDto.password,
      authenticatedEntity.password,
    );
    if (!passwordCorrect) {
      throw new HttpException('Wrong Password', HttpStatus.FORBIDDEN);
    }

    loginDto.type === UserType.user
      ? await this.userService.update(authenticatedEntity.id, {
          fcmToken: loginDto.fcmToken,
        })
      : await this.volunteerService.update(authenticatedEntity.id, {
          fcmToken: loginDto.fcmToken,
        });

    return {
      ...authenticatedEntity,
      ...getTokens({
        id: authenticatedEntity['_id'],
        type: loginDto.type,
      }),
      type: loginDto.type,
      message: `Successfully logged in the ${loginDto.type}`,
    };
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
    if (
      registerDto.type === UserType.volunteer &&
      !registerDto.hobbies &&
      !registerDto.aboutMe &&
      !registerDto.imageUrl
    ) {
      throw new HttpException(
        'Missing essential parameters for volunteer',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser =
      registerDto.type === UserType.user
        ? await this.userService.findByUsername(registerDto.username)
        : await this.volunteerService.findByUsername(registerDto.username);
    if (existingUser) {
      throw new HttpException(
        'User with this name already exists',
        HttpStatus.UNAUTHORIZED,
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
        : await this.volunteerService.create({
            ...baseUserFields,
            hobbies: registerDto.hobbies,
            aboutMe: registerDto.aboutMe,
            imageUrl: registerDto.imageUrl,
          });

    const docValue =
      registerDto.type === UserType.user
        ? { posts: [] }
        : {
            hobbies: registerDto.hobbies,
            aboutMe: registerDto.aboutMe,
            imageUrl: registerDto.imageUrl,
          };

    return {
      _id: createdEntity._id,
      ...baseUserFields,
      ...docValue,
      ...getTokens({
        id: createdEntity['_id'],
        type: registerDto.type,
      }),
      type: registerDto.type,
      message: `Successfully created new ${registerDto.type}`,
    };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    authInfo: AuthInfo,
  ) {
    const authenticatedEntity =
      authInfo.type === UserType.user
        ? await this.userService.findOne(authInfo.id, true)
        : await this.volunteerService.findOne(authInfo.id, true);
    if (!authenticatedEntity) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }
    const passwordCorrect = bcrypt.compareSync(
      changePasswordDto.oldPassword,
      authenticatedEntity.password,
    );
    if (!passwordCorrect) {
      throw new HttpException('Wrong Password', HttpStatus.FORBIDDEN);
    }
    const salt = bcrypt.genSaltSync(12);
    const encryptedPassword = bcrypt.hashSync(
      changePasswordDto.newPassword,
      salt,
    );
    authInfo.type === UserType.user
      ? await this.userService.update(authInfo.id, {
          password: encryptedPassword,
        })
      : await this.volunteerService.update(authInfo.id, {
          password: encryptedPassword,
        });
    return `Successfully updated password`;
  }
}
