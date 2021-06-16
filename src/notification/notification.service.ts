import { Injectable } from '@nestjs/common';
import {
  Notification,
  NotificationDocument,
} from './entities/notification.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  create(createNotificationDto: Notification) {
    return this.notificationModel.create(createNotificationDto);
  }

  findByUser(userId: string) {
    return this.notificationModel.find({ userId }).sort({ time: -1 }).lean();
  }
}
