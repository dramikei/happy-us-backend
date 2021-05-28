import { Controller, Get, Ip } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(@Ip() ip): string {
    return this.appService.ping(ip);
  }
}
