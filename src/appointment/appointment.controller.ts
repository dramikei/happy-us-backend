import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Appointment')
@Controller('api/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {
  }

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findForVolunteer() {
    return this.appointmentService.findForVolunteer();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.appointmentService.findForUser(id);
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.updateStatus(id, updateAppointmentDto);
  }
}
