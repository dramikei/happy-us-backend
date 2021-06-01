import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './entities/post.entity';
import { AuthInfo } from '../auth/auth.middleware';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  create(createPostDto: CreatePostDto, authInfo: AuthInfo) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  findUserPosts(authInfo: AuthInfo) {
    return `This action returns a #${authInfo.id} post`;
  }

  update(postId: string, authInfo: AuthInfo) {
    return 'Updated post';
  }

  remove(postId: string, authInfo: AuthInfo) {
    return `This action removes a #${authInfo.id} post`;
  }
}
