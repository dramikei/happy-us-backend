import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccessBlacklist,
  AccessBlacklistDocument,
  RefreshRevoked,
  RefreshRevokedDocument,
} from './entities/auth.entity';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ReqLogger } from '../utils/logger-instance';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(AccessBlacklist.name)
    private readonly accessBlacklistModal: Model<AccessBlacklistDocument>,
    @InjectModel(RefreshRevoked.name)
    private readonly refreshRevokedModel: Model<RefreshRevokedDocument>,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async use(req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    const accessToken: string = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    const refreshToken = req.headers?.['refresh-token'];

    if (accessToken === undefined || refreshToken === undefined)
      ReqLogger(
        req,
        401,
        'Authentication failed! Access and/or Refresh Tokens not sent',
      );

    // const tokenBlacklisted = await this.userService.findOne(
    //   '60b4f30853f31aa33904ffb7',
    // );

    // console.log(tokenBlacklisted);
    next();
  }
}
