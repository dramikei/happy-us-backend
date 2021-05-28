import { Test, TestingModule } from '@nestjs/testing';
import { ApointmentController } from './apointment.controller';
import { ApointmentService } from './apointment.service';

describe('ApointmentController', () => {
  let controller: ApointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApointmentController],
      providers: [ApointmentService],
    }).compile();

    controller = module.get<ApointmentController>(ApointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
