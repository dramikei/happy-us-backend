import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/registerMongoSchema';
import { Complaint, ComplaintSchema } from './entities/complaint.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(ComplaintSchema, Complaint.name),
    ]),
  ],
  controllers: [ComplaintController],
  providers: [ComplaintService],
})
export class ComplaintModule {}
