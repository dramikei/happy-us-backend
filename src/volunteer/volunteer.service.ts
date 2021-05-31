import { Injectable } from '@nestjs/common';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volunteer, VolunteerDocument } from './entities/volunteer.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectModel(Volunteer.name)
    private readonly volunteerModel: Model<VolunteerDocument>,
  ) {}

  create(createVolunteerDto: CreateVolunteerDto) {
    return 'This action adds a new volunteer';
  }

  findAll() {
    return `This action returns all volunteer`;
  }

  findOne(id: string) {
    return `This action returns a #${id} volunteer`;
  }

  update(id: string, updateVolunteerDto: UpdateVolunteerDto) {
    return `This action updates a #${id} volunteer`;
  }

  remove(id: string) {
    return `This action removes a #${id} volunteer`;
  }
}
