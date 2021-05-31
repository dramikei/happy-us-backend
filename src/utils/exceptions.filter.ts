import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { logger } from './loggerInstance';
import { BaseResponse } from './response.interceptor';
import { ServerResponse } from 'http';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const exceptionDetails =
      exception instanceof HttpException
        ? {
            code: exception.getStatus(),
            message: exception.message,
            status: 'Failed',
          }
        : {
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            status: 'Failed',
          };

    logger.error(
      `--------------Begin Error in path ${request.url}--------------`,
    );
    // using console log because it logs trace
    console.log(exception);
    logger.error(
      `-------------End Error in path ${request.url}-----------------`,
    );

    const errorResponse: BaseResponse<null> = {
      message: exceptionDetails.message,
      status: exceptionDetails.status,
      path: request.url,
      data: null,
    };

    // fastify uses middlewares differently
    // It uses native response instead of Reply wrapper
    if (response instanceof ServerResponse) {
      response.writeHead(exceptionDetails.code, {
        'content-type': 'application/json',
      });
      response.write(JSON.stringify(errorResponse));
      response.end();
    } else {
      return response.code(exceptionDetails.code).send(errorResponse);
    }
  }
}
