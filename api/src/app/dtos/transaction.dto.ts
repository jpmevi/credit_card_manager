import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
export class TransactionPaymentGatewayDto {
  @IsString()
  @ApiProperty()
  readonly sourceAccount: string;

  @IsString()
  @ApiProperty()
  readonly destinationAccount: string;

  @IsString()
  @ApiProperty()
  readonly paymentAccount: string;

  @IsNumber()
  @ApiProperty()
  readonly paymentPercentage: number;

  @IsNumber()
  @ApiProperty()
  readonly amount: number;
}
