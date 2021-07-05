import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBaseResponse } from './utils/api-base-response';

@Controller('api/ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiBaseResponse(String)
  ping(@Ip() ip): string {
    return this.appService.ping(ip);
  }
}
