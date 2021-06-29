import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { AuthInfo, GetAuthInfo } from './auth.middleware';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Patch('changePassword')
  @ApiBearerAuth()
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.authService.changePassword(changePasswordDto, authInfo);
  }
}
