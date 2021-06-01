import { AppointmentStatus } from '../entities/appointment.entity';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateAppointmentDto {
  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

  @IsNotEmpty()
  @IsMongoId()
  appointmentId: string;

  @IsNotEmpty()
  rejectMessage: string;

  @IsNotEmpty()
  acceptMessage: string;
}
