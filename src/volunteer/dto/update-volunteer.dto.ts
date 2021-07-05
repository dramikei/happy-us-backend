import { PartialType } from '@nestjs/swagger';
import { Volunteer } from '../entities/volunteer.entity';

export class UpdateVolunteerDto extends PartialType(Volunteer) {}
