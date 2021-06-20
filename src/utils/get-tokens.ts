import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserType } from '../auth/dto/login.dto';

export const getTokens = (payload: {
  id: string;
  type: UserType;
}): { accessToken: string; refreshToken: string } => {
  try {
    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (err) {
    throw new HttpException(
      'Authentication failed, please try again later.',
      HttpStatus.FORBIDDEN,
    );
  }
};
