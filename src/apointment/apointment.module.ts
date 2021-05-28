import { Module } from '@nestjs/common';
import { ApointmentService } from './apointment.service';
import { ApointmentController } from './apointment.controller';

@Module({
  controllers: [ApointmentController],
  providers: [ApointmentService],
})
export class ApointmentModule {}
