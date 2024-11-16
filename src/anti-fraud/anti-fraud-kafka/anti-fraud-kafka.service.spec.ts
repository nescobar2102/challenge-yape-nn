import { Test, TestingModule } from '@nestjs/testing';
import { AntiFraudKafkaService } from './anti-fraud-kafka.service';

describe('AntiFraudKafkaService', () => {
  let service: AntiFraudKafkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AntiFraudKafkaService],
    }).compile();

    service = module.get<AntiFraudKafkaService>(AntiFraudKafkaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
