import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async create(createVolunteerDto: Volunteer) {
    const existingVolunteer = await this.volunteerModel
      .findOne({ username: createVolunteerDto.username })
      .lean();
    if (existingVolunteer) {
      throw new HttpException(
        'Volunteer with same name exists, please try another name.',
        HttpStatus.CONFLICT,
      );
    }
    const newVolunteer = new this.volunteerModel(createVolunteerDto);
    return await newVolunteer.save();
  }

  async findAll() {
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
