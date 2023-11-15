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

export class AuthDto {

  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  readonly pin: string;

  @IsOptional()
  //@ApiProperty()
  user: User;

}


