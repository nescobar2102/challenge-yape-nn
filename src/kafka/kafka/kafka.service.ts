import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { Transaction } from '../../transactions/transaction.entity';

@Injectable()
export class KafkaService {
  private kafka = new Kafka({
    brokers: ['kafka:29092'],  
  });
  private producer = this.kafka.producer();
  private consumer = this.kafka.consumer({ groupId: 'default-group' });

  constructor() {
    this.init();
  }

  async init() {
    await this.producer.connect();
    await this.consumer.connect(); 
  }


  async sendTransactionCreated(transaction: Transaction) {
    await this.producer.send({
      topic: 'transaction-created',
      messages: [{ value: JSON.stringify(transaction) }],
    });
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
}