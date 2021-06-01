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

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).lean();
  }

  async findOne(id: string, includePassword?: boolean) {
    return this.userModel
      .findById(id)
      .lean()
      .select({ password: includePassword ? 1 : 0 });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }
}
