import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { User } from '../entities/User.entity';
import { Timestamp } from 'typeorm';
export class CreateReviewDto {
  @IsString()
  @ApiProperty()
  readonly comment: string;

  @IsInt()
  @ApiProperty()
  readonly rate: number;

  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsOptional()
  @ApiProperty()
  user: User;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly created_at: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updated_at: Date;
}

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly comment: string;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  readonly rate: number;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly created_at: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updated_at: Date;
}
