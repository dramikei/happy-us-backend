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
    return this.volunteerModel.find().lean();
  }

  async findOne(id: string, includePassword?: boolean) {
    return this.volunteerModel
      .findById(id)
      .lean()
      .select({ password: includePassword ? 1 : 0 });
  }

  async findByUsername(username: string) {
    return this.volunteerModel.findOne({ username }).lean();
  }

  async update(id: string, updateVolunteerDto: UpdateVolunteerDto) {
    return this.volunteerModel.findByIdAndUpdate(id, updateVolunteerDto).lean();
  }

  async remove(id: string) {
    return this.volunteerModel.findByIdAndRemove(id).lean();
  }
}
