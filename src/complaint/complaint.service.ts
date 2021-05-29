import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Complaint, ComplaintDocument } from './entities/complaint.entity';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel(Complaint.name)
    private readonly complaintModel: Model<ComplaintDocument>,
  ) {}

  create(createComplaintDto: CreateComplaintDto) {
    return 'This action adds a new complaint';
  }

  findAll() {
    return `This action returns all complaint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaint`;
  }

  update(id: number, updateComplaintDto: UpdateComplaintDto) {
    return `This action updates a #${id} complaint`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaint`;
  }
}
