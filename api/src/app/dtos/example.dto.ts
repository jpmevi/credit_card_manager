import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ActivationDate } from '../validators/example.validator';

export class CreateExampleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly code: string;

  @IsString()
  @ActivationDate('status')
  //Custom validation
  readonly activation_at: Date;
}

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}

export class FilterExampleDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit?: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset?: number;
}
