import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Appointment,
  AppointmentDocument,
} from './entities/appointment.entity';
import { AuthInfo } from '../auth/auth.middleware';
import { UserType } from '../auth/dto/login.dto';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    const newAppointment = new this.appointmentModel({
      ...createAppointmentDto,
      userId,
      status: 'pending',
    });
    // await this.notificationService.create({});
    return newAppointment.save();
  }

  async findForUser(authInfo: AuthInfo) {
    return authInfo.type === UserType.user
      ? this.appointmentModel.find({ userId: authInfo.id })
      : this.appointmentModel.find({ volunteerId: authInfo.id });
  }

  async updateStatus(
    { appointmentId, message, status }: UpdateAppointmentDto,
    authInfo: AuthInfo,
  ) {
    // await this.notificationService.create({});
    if (authInfo.type === UserType.user) {
      throw new HttpException(
        'Only volunteer can update status',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appointmentModel.findByIdAndUpdate(appointmentId, {
      message,
      status,
    });
  }
}
