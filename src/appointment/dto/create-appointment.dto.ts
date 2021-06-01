import { UserSocial } from '../entities/appointment.entity';
import { IsDate, IsMongoId, IsNotEmpty, IsObject } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsMongoId()
  volunteerId: string;

  @IsNotEmpty()
  @IsObject()
  userSocial: {
    id: string;
    platform: UserSocial;
  };

  @IsNotEmpty()
  @IsDate()
  time: Date;
}
