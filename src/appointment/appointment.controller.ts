import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
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
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @GetAuthInfo() authInfo: AuthInfo,
  ) {
    return this.appointmentService.create(createAppointmentDto, authInfo.id);
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
