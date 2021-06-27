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
import axios from 'axios';
import { VolunteerService } from '../volunteer/volunteer.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<AppointmentDocument>,
    private readonly notificationService: NotificationService,
    private readonly volunteerService: VolunteerService,
    private readonly userService: UserService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    const newAppointment = new this.appointmentModel({
      ...createAppointmentDto,
      userId,
      status: 'pending',
    });
    const volunteer = await this.volunteerService.findOne(
      createAppointmentDto.volunteerId,
    );
    if (!volunteer) {
      throw new HttpException(
        'Volunteer for this Id, not found',
        HttpStatus.NOT_FOUND,
      );
    }
    // this is meant for volunteer
    await this.notificationService.create({
      redirectTo: `/appointments/${newAppointment._id}`,
      title: 'New Appointment Alert',
      time: createAppointmentDto.time,
      seen: false,
      description: `Hey good person, check out this appointment from ${createAppointmentDto.userSocial.id}`,
      userId: createAppointmentDto.volunteerId,
    });

    await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: volunteer.fcmToken,
        notification: {
          title: 'New Appointment Alert',
          body: `Hey good person, check out this appointment from ${createAppointmentDto.userSocial.id}`,
        },
      },
      {
        headers: {
          Authorization: `key=${process.env.SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return newAppointment.save();
  }

  async findForUser(authInfo: AuthInfo) {
    return authInfo.type === UserType.user
      ? this.appointmentModel.find({ userId: authInfo.id }).sort({ time: -1 })
      : this.appointmentModel
          .find({ volunteerId: authInfo.id })
          .sort({ time: -1 });
  }

  async updateStatus(
    { appointmentId, message, status }: UpdateAppointmentDto,
    authInfo: AuthInfo,
  ) {
    if (authInfo.type === UserType.user) {
      throw new HttpException(
        'Only volunteer can update status',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingAppointment = await this.appointmentModel
      .findById(appointmentId)
      .lean();
    if (!existingAppointment)
      throw new HttpException('Invalid Appointment ID', HttpStatus.NOT_FOUND);

    const user = await this.userService.findOne(existingAppointment.userId);
    if (!user) {
      throw new HttpException(
        'User for this Id, not found.',
        HttpStatus.NOT_FOUND,
      );
    }
    // this is meant for user
    await this.notificationService.create({
      redirectTo: `/appointments/${appointmentId}`,
      title: `Appointment Status: ${status}`,
      time: new Date(),
      seen: false,
      description: `Message from our volunteer: ${message}`,
      userId: existingAppointment.userId,
    });

    await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: user.fcmToken,
        notification: {
          title: `Appointment Status: ${status}`,
          body: `Message from our volunteer: ${message}`,
        },
      },
      {
        headers: {
          Authorization: `key=${process.env.SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    await this.appointmentModel.updateOne(
      { _id: appointmentId },
      {
        message,
        status,
      },
    );

    return {
      ...existingAppointment,
      message,
      status,
    };
  }
}
