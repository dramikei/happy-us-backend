import { Module } from '@nestjs/common';
import { OrphanStepsService } from './orphan-steps.service';
import { OrphanStepsController } from './orphan-steps.controller';

@Module({
  controllers: [OrphanStepsController],
  providers: [OrphanStepsService],
})
export class OrphanStepsModule {}
