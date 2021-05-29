import { Injectable } from '@nestjs/common';
import { CreateOrphanStepsDto } from './dto/create-orphan-steps.dto';
import { UpdateOrphanStepsDto } from './dto/update-orphan-steps.dto';

@Injectable()
export class OrphanStepsService {
  create(createOrphanStepDto: CreateOrphanStepsDto) {
    return 'This action adds a new orphanStep';
  }

  findAll() {
    return `This action returns all orphanSteps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orphanStep`;
  }

  update(id: number, updateOrphanStepDto: UpdateOrphanStepsDto) {
    return `This action updates a #${id} orphanStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} orphanStep`;
  }
}
