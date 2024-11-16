import { Module } from '@nestjs/common'; 
import { KafkaService } from './kafka/kafka.service';

@Module({
  providers: [KafkaService],
  exports: [KafkaService], // Exporta para que otros módulos puedan utilizarlo
})
export class KafkaModule {}