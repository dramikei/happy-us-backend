import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(ip: string): string {
    return `Server Pinged from ${ip}`;
  }
}
