import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  ping(ip: string): string {
    // heroku sleep hack
    setTimeout(async () => {
      await axios.get('https://happyusapi.herokuapp.com/api/ping');
      console.log('Keeping the server alive!!');
    }, 20 * 60 * 1000); // 10 minutes interval

    return `Server Pinged from ${ip}`;
  }
}
