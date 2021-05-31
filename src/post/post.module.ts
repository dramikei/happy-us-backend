import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/register-mongo-schema';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(PostSchema, Post.name),
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
