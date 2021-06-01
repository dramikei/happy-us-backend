import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';

@ApiTags('user')
@ApiBearerAuth()
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(@GetAuthInfo() authInfo: AuthInfo) {
    return this.userService.findOne(authInfo.id);
  }

  @Patch()
  update(
    @GetAuthInfo() authInfo: AuthInfo,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(authInfo.id, updateUserDto);
  }

  @Delete()
  remove(@GetAuthInfo() authInfo: AuthInfo) {
    return this.userService.remove(authInfo.id);
  }
}
