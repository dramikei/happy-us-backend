import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BaseResponse<T> {
  data: T;
  message: string;
  path: string;
  status: string;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse<T>> {
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => ({
        data,
        tokens: {
          accessToken: request.raw?.info?.accessToken,
          refreshToken: request.raw?.info?.refreshToken,
        },
        message: data?.message || 'No error occurred',
        path: context.switchToHttp().getRequest().url,
        status: 'Success', // if a request reaches this interceptor it's execution is successful
      })),
    );
  }
}
