import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':userId')
  findUserPosts(@Param('userId') userId: string) {
    return this.postService.findUserPosts(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
