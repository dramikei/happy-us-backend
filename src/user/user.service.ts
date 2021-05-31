import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: User) {
    const existingUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .lean();
    if (existingUser) {
      throw new HttpException(
        'User with same name exists, please try another name.',
        HttpStatus.CONFLICT,
      );
    }
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  findOne(id: string) {
    return this.userModel.findById(id).lean().select({ password: 0 });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
