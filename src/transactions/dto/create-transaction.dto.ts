import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
 
export class CreateTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  accountExternalIdDebit: string;

  @IsNotEmpty()
  @IsUUID()
  accountExternalIdCredit: string;

  @IsNotEmpty()
  tranferTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}