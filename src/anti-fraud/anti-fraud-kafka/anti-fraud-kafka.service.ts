import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Transaction } from '../../transactions/transaction.entity';
import { AntiFraudService } from '../../anti-fraud/anti-fraud/anti-fraud.service';

@Injectable()
export class AntiFraudKafkaService {

  private kafka = new Kafka({ 
     brokers: ['kafka:29092'],   
  });
  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: 'anti-fraud-group' });
  constructor(private readonly antiFraudService: AntiFraudService) {
    this.init();
  }

  async init() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'transaction-created', fromBeginning: true });
    await this.listenForTransactionCreated();
  }

  async sendTransactionStatusApproved(transaction: Transaction) {
    await this.producer.send({
      topic: 'transaction-status-approved',
      messages: [{ value: JSON.stringify(transaction) }],
    });
  }

  async sendTransactionStatusRejected(transaction: Transaction) {
    await this.producer.send({
      topic: 'transaction-status-rejected',
      messages: [{ value: JSON.stringify(transaction) }],
    });
  }

  private async listenForTransactionCreated() {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const transactionData = JSON.parse(message.value.toString());
        await this.antiFraudService.evaluateTransaction(transactionData);

      },
    });
  }
}