import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { registerMongoSchema } from '../utils/register-mongo-schema';
import { NotificationModule } from '../notification/notification.module';
import { VolunteerModule } from '../volunteer/volunteer.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(AppointmentSchema, Appointment.name),
    ]),
    NotificationModule,
    VolunteerModule,
    UserModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
