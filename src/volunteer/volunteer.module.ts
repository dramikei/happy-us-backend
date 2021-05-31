import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/register-mongo-schema';
import { Volunteer, VolunteerSchema } from './entities/volunteer.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(VolunteerSchema, Volunteer.name),
    ]),
  ],
  controllers: [VolunteerController],
  providers: [VolunteerService],
  exports: [VolunteerService],
})
export class VolunteerModule {}
