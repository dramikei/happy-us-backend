import { Module } from '@nestjs/common';
import { OrphanStepsService } from './orphan-steps.service';
import { OrphanStepsController } from './orphan-steps.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { registerMongoSchema } from '../utils/registerMongoSchema';
import { OrphanSteps, OrphanStepsSchema } from './entities/orphan-steps.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      registerMongoSchema(OrphanStepsSchema, OrphanSteps.name),
    ]),
  ],
  controllers: [OrphanStepsController],
  providers: [OrphanStepsService],
})
export class OrphanStepsModule {}
