import { PartialType } from '@nestjs/mapped-types';
import { Volunteer } from '../entities/volunteer.entity';

export class UpdateVolunteerDto extends PartialType(Volunteer) {}
