import {
  createParamDecorator,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AccessBlacklist,
  AccessBlacklistDocument,
  RefreshRevoked,
  RefreshRevokedDocument,
} from './entities/auth.entity';
import * as jwt from 'jsonwebtoken';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { getTokens } from '../utils/get-tokens';
import { UserType } from './dto/login.dto';

export type DecodedToken = {
  id: string;
  type: UserType;
};

export type AuthInfo = {
  id: string;
  type: UserType;
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(AccessBlacklist.name)
    private readonly accessBlacklistModal: Model<AccessBlacklistDocument>,
    @InjectModel(RefreshRevoked.name)
    private readonly refreshRevokedModel: Model<RefreshRevokedDocument>,
  ) {}

  async use(req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    }
    const accessToken: string = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    const refreshToken = req.headers?.['refresh-token'];

    if (accessToken === undefined && refreshToken === undefined)
      throw new HttpException(
        'Authentication failed! Access and/or Refresh Tokens not sent',
        HttpStatus.FORBIDDEN,
      );

    try {
      const { id, type } = jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
      ) as DecodedToken;
      req.info = { id, type };
    } catch (err) {
      const { id, type } = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ) as DecodedToken;
      const { newAccessToken, newRefreshToken } = getTokens({
        id,
        type,
      });
      req.info = {
        id,
        type,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      } as AuthInfo;
    }

    next();
  }
}

// this is to be called on routes that need auth state
// to work as excepted make sure that route uses auth-middleware
export const GetAuthInfo = createParamDecorator(
  (data: any, req: ExecutionContextHost) => {
    return req.switchToHttp().getRequest().raw.info;
  },
);
