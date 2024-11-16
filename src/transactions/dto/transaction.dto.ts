import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class TransactionDto {
  @Field()
  transactionExternalId: string;

  @Field(() => String)
  transactionType: {
    name: string;
  };

  @Field(() => String)
  transactionStatus: {
    name: string;
  };

  @Field(() => Float)
  value: number;

  @Field()
  createdAt: string;   
}