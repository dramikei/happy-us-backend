import { Test, TestingModule } from '@nestjs/testing';
import { OrphanStepsController } from './orphan-steps.controller';
import { OrphanStepsService } from './orphan-steps.service';

describe('OrphanStepsController', () => {
  let controller: OrphanStepsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrphanStepsController],
      providers: [OrphanStepsService],
    }).compile();

    controller = module.get<OrphanStepsController>(OrphanStepsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
