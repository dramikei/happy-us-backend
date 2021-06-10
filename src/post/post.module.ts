import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/register-mongo-schema';
import { Post, PostSchema } from './entities/post.entity';
import { UserModule } from '../user/user.module';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(PostSchema, Post.name),
    ]),
    forwardRef(() => UserModule),
    NotificationService,
  ],
  exports: [PostService],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
