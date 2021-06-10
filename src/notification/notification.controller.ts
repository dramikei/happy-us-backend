import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';
import { Notification } from './entities/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  create(@Body() createNotificationDto: Notification) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  findByUser(@GetAuthInfo() authInfo: AuthInfo) {
    return this.notificationService.findByUser(authInfo.id);
  }
}
