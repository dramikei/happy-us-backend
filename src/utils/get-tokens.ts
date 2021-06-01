import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserType } from '../auth/dto/login.dto';

export const getTokens = (payload: {
  id: string;
  type: UserType;
}): { newAccessToken: string; newRefreshToken: string } => {
  try {
    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1hr',
    });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { newAccessToken, newRefreshToken };
  } catch (err) {
    throw new HttpException(
      'Authentication failed, please try again later.',
      HttpStatus.FORBIDDEN,
    );
  }
};
