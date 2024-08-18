import { Test, TestingModule } from '@nestjs/testing';
import { SpottisController } from './spottis.controller';

describe('SpottisController', () => {
  let controller: SpottisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpottisController],
    }).compile();

    controller = module.get<SpottisController>(SpottisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
