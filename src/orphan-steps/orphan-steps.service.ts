import { Injectable } from '@nestjs/common';
import { CreateOrphanStepDto } from './dto/create-orphan-step.dto';
import { UpdateOrphanStepDto } from './dto/update-orphan-step.dto';

@Injectable()
export class OrphanStepsService {
  create(createOrphanStepDto: CreateOrphanStepDto) {
    return 'This action adds a new orphanStep';
  }

  findAll() {
    return `This action returns all orphanSteps`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orphanStep`;
  }

  update(id: number, updateOrphanStepDto: UpdateOrphanStepDto) {
    return `This action updates a #${id} orphanStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} orphanStep`;
  }
}
