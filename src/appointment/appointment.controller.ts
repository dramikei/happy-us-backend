import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthInfo, GetAuthInfo } from '../auth/auth.middleware';

@ApiTags('Appointment')
@Controller('api/appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findForUser(@GetAuthInfo() authInfo: AuthInfo) {
    return this.appointmentService.findForUser(authInfo);
  }

  @Patch()
  updateStatus(
    @GetAuthInfo() authInfo: AuthInfo,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.updateStatus(updateAppointmentDto, authInfo);
  }
}
