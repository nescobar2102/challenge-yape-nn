import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { KafkaService } from '../kafka/kafka/kafka.service';
import { TransactionDto } from './dto/transaction.dto'; // Asegúrate de importar el DTO
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private kafkaService: KafkaService,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(createTransactionDto);
    transaction.status = 'pendiente';   

    await this.transactionsRepository.save(transaction);
    await this.kafkaService.sendTransactionCreated(transaction);  
    
    return transaction;
  }

  async findOne(id: string): Promise<TransactionDto> {
    const transaction = await this.transactionsRepository.findOneBy({ id });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return {
      transactionExternalId: transaction.id,
      transactionType: { name: 'ABONO' },
      transactionStatus: { name: transaction.status},
      value: transaction.value,
      createdAt: transaction.createdAt.toISOString(), 
    };    
  }


  async updateStatus(transaction: Transaction): Promise<void> {
    await this.transactionsRepository.update(transaction.id, { status: transaction.status });
  }
}