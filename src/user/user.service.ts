import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { ClientSession, LeanDocument, Model } from 'mongoose';
import { PostService } from '../post/post.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
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

  async findOne(
    id: string,
    includePassword?: boolean,
    heavyDoc?: boolean,
  ): Promise<UserDocument | LeanDocument<UserDocument>> {
    return heavyDoc
      ? this.userModel
          .findById(id)
          .select({ password: includePassword ? 1 : 0 })
      : this.userModel
          .findById(id)
          .lean()
          .select({ password: includePassword ? 1 : 0 });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    session?: ClientSession,
  ) {
    const existingUsername = await this.userModel
      .findOne({ username: updateUserDto.username })
      .select({ username: 1, password: 0, posts: 0, _id: 0, fcmToken: 0 })
      .lean();
    if (existingUsername) {
      throw new HttpException(
        'User with this name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      session && { session },
    );
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    await this.postService.removeAllOfUser(user.posts);
    return this.userModel.findByIdAndDelete(id);
  }
}
