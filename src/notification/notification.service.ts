import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async markSeen(notificationId: string, userId: string) {
    const notification = await this.notificationModel.findById(notificationId);
    if (notification.userId !== userId) {
      throw new HttpException(
        'Not permitted to change notification status of other user',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.notificationModel.updateOne(
      { _id: notificationId },
      { seen: true },
    );
  }
}
