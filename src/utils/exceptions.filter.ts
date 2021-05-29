import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const exceptionDetails =
      exception instanceof HttpException
        ? { status: exception.getStatus(), error: exception.message }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          };

    this.logger.error(
      `--------------Begin Error in path ${request.url}--------------`,
    );
    // using console log because it logs trace
    console.log(exception);
    this.logger.error(
      `-------------End Error in path ${request.url}-----------------`,
    );
    return response.status(exceptionDetails.status).send({
      ...exceptionDetails,
      path: request.url,
    });
  }
}
