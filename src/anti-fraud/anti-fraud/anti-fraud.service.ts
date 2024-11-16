import { Injectable } from '@nestjs/common';
import { KafkaService } from '../../kafka/kafka/kafka.service';
import { Transaction } from '../../transactions/transaction.entity';

@Injectable()
export class AntiFraudService {
  constructor(private readonly kafkaService: KafkaService) {}

  async evaluateTransaction(transaction: Transaction) { 

    const isApproved = transaction.value > 1000 ? false:true;

    if (isApproved) {
      transaction.status = 'approved';
      await this.kafkaService.sendTransactionStatusApproved(transaction);
    } else {
      transaction.status = 'rejected';
      await this.kafkaService.sendTransactionStatusRejected(transaction);
    }
  }
}