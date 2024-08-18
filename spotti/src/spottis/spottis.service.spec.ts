import { Test, TestingModule } from '@nestjs/testing';
import { SpottisService } from './spottis.service';

describe('SpottisService', () => {
  let service: SpottisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpottisService],
    }).compile();

    service = module.get<SpottisService>(SpottisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
