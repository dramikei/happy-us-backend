import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';
import { Notification } from './entities/notification.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiBaseResponse } from '../utils/api-base-response';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiBaseResponse({
    model: Notification,
    sendTokens: true,
    createTypeRequest: true,
  })
  create(@Body() createNotificationDto: Notification) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiBaseResponse({
    model: Notification,
    oneOfUserTypes: false,
    isArray: true,
    sendTokens: true,
  })
  findByUser(@GetAuthInfo() authInfo: AuthInfo) {
    return this.notificationService.findByUser(authInfo.id);
  }

  @Patch('/markSeen')
  @ApiBaseResponse({ model: Notification, sendTokens: true })
  markSeen(
    @Body() updateNotificationDto: { notificationId: string },
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.notificationService.markSeen(
      updateNotificationDto.notificationId,
      authInfo.id,
    );
  }
}
