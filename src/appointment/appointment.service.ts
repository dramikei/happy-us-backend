import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new Appointment';
  }

  findAll() {
    return `This action returns all Appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} Appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} Appointment`;
  }
}
