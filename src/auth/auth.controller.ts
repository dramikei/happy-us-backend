import { Body, Controller, HttpCode, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthInfo, GetAuthInfo } from './auth.middleware';
import { ApiBaseResponse } from '../utils/api-base-response';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login as a volunteer or a user
   * */
  @Post('login')
  @HttpCode(200)
  @ApiBaseResponse({
    model: Object,
    oneOfUserTypes: true,
    sendTokens: true,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Register as a user or volunteer, adminToken is required only for volunteer
   * */
  @Post('register')
  @ApiBaseResponse({
    model: Object,
    oneOfUserTypes: true,
    sendTokens: true,
    createTypeRequest: true,
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Change password of both types, requires old password for re-authentication
   * */
  @Patch('changePassword')
  @ApiBaseResponse({ model: String, sendTokens: true })
  @ApiBearerAuth()
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.authService.changePassword(changePasswordDto, authInfo);
  }
}
