import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Post as PostDto } from './entities/post.entity';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';
import { ApiBaseResponse } from '../utils/api-base-response';

@ApiTags('post')
@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBearerAuth()
  @ApiBaseResponse({
    model: PostDto,
    sendTokens: true,
    createTypeRequest: true,
  })
  create(@Body() createPostDto: PostDto, @GetAuthInfo() authInfo: AuthInfo) {
    return this.postService.create(createPostDto, authInfo);
  }

  @Get()
  @ApiBaseResponse({ model: PostDto, oneOfUserTypes: false, isArray: true })
  findAll() {
    return this.postService.findAll();
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiBaseResponse({
    model: PostDto,
    oneOfUserTypes: false,
    isArray: true,
    sendTokens: true,
  })
  findUserPosts(@GetAuthInfo() authInfo: AuthInfo) {
    return this.postService.findUserPosts(authInfo);
  }

  @Patch()
  @ApiBearerAuth()
  @ApiBaseResponse({ model: PostDto, sendTokens: true })
  updateLikeCount(
    @Body() updatePostDto: { postId: string; event: 'add' | 'remove' },
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.postService.updateLikeCount(updatePostDto, authInfo);
  }

  @Delete()
  @ApiBearerAuth()
  @ApiBaseResponse({ model: String, sendTokens: true })
  remove(
    @Body() deletePostDto: { postId: string },
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.postService.remove(deletePostDto.postId, authInfo);
  }
}
