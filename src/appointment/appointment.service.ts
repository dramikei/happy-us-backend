import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Appointment,
  AppointmentDocument,
} from './entities/appointment.entity';
import { AuthInfo } from '../auth/auth.middleware';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
  ) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new Appointment';
  }

  findForUser(authInfo: AuthInfo) {
    return `This action returns a #${authInfo.id} Appointment`;
  }

  // only volunteer can change it
  // check for user type in req for verification
  updateStatus(updateAppointmentDto: UpdateAppointmentDto, authInfo: AuthInfo) {
    return `This action updates a #${updateAppointmentDto.appointmentId} Appointment`;
  }
}
