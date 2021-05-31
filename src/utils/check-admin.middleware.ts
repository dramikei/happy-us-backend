import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class CheckAdminMiddleware implements NestMiddleware {
  async use(req, res, next) {
    const searchParams = new URLSearchParams(req.url);

    if (
      req.method !== 'GET' &&
      searchParams.get('/?adminToken') !== process.env.AdminToken
    ) {
      throw new HttpException(
        'Only admin can perform these actions.',
        HttpStatus.FORBIDDEN,
      );
    }
    next();
  }
}
