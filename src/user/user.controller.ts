import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';
import { ApiBaseResponse } from '../utils/api-base-response';
import { User } from './entities/user.entity';

@ApiTags('user')
@ApiBearerAuth()
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBaseResponse({ model: User, sendTokens: true })
  findOne(@GetAuthInfo() authInfo: AuthInfo) {
    return this.userService.findOne(authInfo.id);
  }

  @Patch()
  @ApiBaseResponse({ model: User, sendTokens: true })
  update(
    @GetAuthInfo() authInfo: AuthInfo,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(authInfo.id, updateUserDto);
  }

  @Delete()
  @ApiBaseResponse({ model: User, sendTokens: true })
  remove(@GetAuthInfo() authInfo: AuthInfo) {
    return this.userService.remove(authInfo.id);
  }
}
