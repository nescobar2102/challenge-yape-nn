import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Transaction } from './transaction.entity';
import * as dotenv from 'dotenv'; 
import { TransactionsService } from './transactions.service';
dotenv.config();

@Injectable()
export class TransactionsKafkaService {
  private kafka = new Kafka({
    brokers: ['kafka:29092'],  
  });
  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: 'transaction-group' });

  constructor(private readonly transactionsService: TransactionsService) {
    this.init();
  }

  async init() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'transaction-status-updated', fromBeginning: true });
    await this.listenForTransactionUpdates();
  }

  async sendTransactionCreated(transaction: Transaction) {
    await this.producer.send({
      topic: 'transaction-created',
      messages: [{ value: JSON.stringify(transaction) }],
    });
  }

  private async listenForTransactionUpdates() {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const transactionData = JSON.parse(message.value.toString());
        await this.transactionsService.updateStatus(transactionData);
      },
    });
  }
}