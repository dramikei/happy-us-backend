import { Test, TestingModule } from '@nestjs/testing';
import { OrphanStepsService } from './orphan-steps.service';

describe('OrphanStepsService', () => {
  let service: OrphanStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrphanStepsService],
    }).compile();

    service = module.get<OrphanStepsService>(OrphanStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
