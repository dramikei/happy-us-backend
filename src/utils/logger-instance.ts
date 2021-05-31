import { Logger } from '@nestjs/common';

export const logger = new Logger();

export const ReqLogger = (req: Request, code: number, message: string) => {
  const method = code >= 400 ? 'error' : 'info';
  logger[method]({
    message,
    method: req.method,
    headers: req.headers,
    ip: req.url,
  });
};
