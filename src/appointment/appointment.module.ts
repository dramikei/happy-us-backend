import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointmentController';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './entities/appointment.entity';
import { registerMongoSchema } from '../utils/registerMongoSchema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(AppointmentSchema, Appointment.name),
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
