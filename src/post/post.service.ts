import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { AuthInfo } from '../auth/auth.middleware';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/entities/user.entity';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createPostDto: Post, authInfo: AuthInfo) {
    const user = (await this.userService.findOne(
      authInfo.id,
      false,
      true,
    )) as UserDocument;
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const newPost = new this.postModel(createPostDto);
    const session = await this.postModel.startSession();
    await session.startTransaction();
    user.posts = [...user.posts, newPost._id];
    try {
      await Promise.all([newPost.save({ session }), user.save({ session })]);
      // commit
      await session.commitTransaction();
      session.endSession();
      return newPost;
    } catch (e) {
      // abort
      await session.abortTransaction();
      session.endSession();
      throw new HttpException(
        'Failed to add the post',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async removeAllOfUser(ids: string[]) {
    return this.postModel.deleteMany({
      _id: { $in: ids.map(mongoose.Types.ObjectId) },
    });
  }

  async findAll() {
    return this.postModel.find().lean();
  }

  async findUserPosts(authInfo: AuthInfo) {
    const user = (await this.userService.findOne(
      authInfo.id,
      false,
      true,
    )) as UserDocument;
    return user.populate('posts');
  }

  async updateLikeCount(
    { postId, event }: { postId: string; event: 'add' | 'remove' },
    authInfo: AuthInfo,
  ) {
    const existingPost = await this.postModel.findById(postId).lean();
    // todo: create notification on update
    // await this.notificationService.create();
    if (event === 'remove') {
      if (existingPost === null)
        throw new HttpException(
          'The post does not exist',
          HttpStatus.BAD_REQUEST,
        );
      await this.postModel.findByIdAndUpdate(postId, {
        likedBy: existingPost.likedBy?.filter((id) => id !== authInfo.id),
      });
    } else {
      const alreadyLiked = existingPost.likedBy
        .map(String)
        .includes(authInfo.id);

      if (alreadyLiked) {
        throw new HttpException(
          'Already liked this post!!',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.postModel.findByIdAndUpdate(postId, {
        likedBy: [...existingPost.likedBy, authInfo.id],
      });
    }
  }

  async remove(postId: string, authInfo: AuthInfo) {
    const user = (await this.userService.findOne(
      authInfo.id,
      false,
      true,
    )) as UserDocument;
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const session = await this.postModel.startSession();
    await session.startTransaction();
    user.posts = user.posts.map(String).filter((post) => post !== postId);
    try {
      await Promise.all([
        this.postModel.findByIdAndDelete(postId),
        user.save({ session }),
      ]);
      // commit
      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      // abort
      await session.abortTransaction();
      session.endSession();
      throw new HttpException(
        'Failed to add the post',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return 'Successfully deleted post!!';
  }
}
