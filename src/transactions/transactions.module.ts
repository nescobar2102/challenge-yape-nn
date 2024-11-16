import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction } from './transaction.entity';
import { TransactionsKafkaService } from './transactions.kafka.service';
import { KafkaModule } from '../kafka/kafka.module';  // Importa el KafkaModule

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]),
  KafkaModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsKafkaService],
})
export class TransactionsModule {}