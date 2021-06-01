import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';

@ApiTags('post')
@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.postService.create(createPostDto, authInfo);
  }

  @Get('all')
  findAll() {
    return this.postService.findAll();
  }

  @Get()
  findUserPosts(@GetAuthInfo() authInfo: AuthInfo) {
    return this.postService.findUserPosts(authInfo);
  }

  @Patch(':postId')
  update(@Param('postId') postId: string, @GetAuthInfo() authInfo: AuthInfo) {
    return this.postService.update(postId, authInfo);
  }

  @Delete(':postId')
  remove(@Param('postId') postId: string, @GetAuthInfo() authInfo: AuthInfo) {
    return this.postService.remove(postId, authInfo);
  }
}
