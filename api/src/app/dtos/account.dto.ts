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
export class CreateAccountDto {
  @IsString()
  @ApiProperty()
  readonly number: string;

  @IsDate()
  @ApiProperty()
  readonly doe: Date;

  @IsString()
  @ApiProperty()
  readonly cvv: string;

  @IsString()
  @ApiProperty()
  readonly accountType: string;
}

export class CreateUserAndAccountDto {
  @IsString()
  @ApiProperty()
  readonly username: string;

  @IsString()
  @ApiProperty()
  readonly cui: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsDate()
  @ApiProperty()
  readonly dob: Date;

  @IsString()
  @ApiProperty()
  pin: string;

  @IsEnum(['administrator', 'customer'])
  @ApiProperty({ enum: ['administrator', 'customer'] })
  readonly role: string;

  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => CreateAccountDto)
  @ApiProperty({ type: [CreateAccountDto] })
  readonly account: CreateAccountDto[];
}

export class UpdateAccountDto {
  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly doe?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly cvv?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly balance?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly limit?: number;

  @IsNumber()
  @IsOptional()
  readonly idAccountType?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  readonly rejections?: number;
}

export class UpdateUserAndAccountDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly cui?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly lastName?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly dob?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly pin?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly notifyMe?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly reminder?: boolean;

  @IsEnum(['administrator', 'customer'])
  @IsOptional()
  @ApiProperty({ enum: ['administrator', 'customer'] })
  readonly role?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAccountDto)
  @ApiProperty({ type: UpdateAccountDto })
  readonly account?: UpdateAccountDto;
}

export class ValidateAccountDto {
  @IsString()
  @ApiProperty()
  readonly account: string;

  @IsString()
  @ApiProperty()
  readonly associationPin: string;
}
