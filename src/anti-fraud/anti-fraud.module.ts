import { Module } from '@nestjs/common';
import { AntiFraudService } from '../anti-fraud/anti-fraud/anti-fraud.service'
import { AntiFraudKafkaService } from './anti-fraud-kafka/anti-fraud-kafka.service';
import { KafkaModule } from '../kafka/kafka.module';  // Importa el KafkaModule

@Module({
  imports: [KafkaModule],
  providers: [AntiFraudService, AntiFraudKafkaService],
})
export class AntiFraudModule {}