import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/register-mongo-schema';
import {
  Notification,
  NotificationSchema,
} from './entities/notification.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(NotificationSchema, Notification.name),
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
