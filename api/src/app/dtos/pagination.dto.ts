import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    
    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number = 10;

    @IsNumber()
    @IsOptional()
    offset: number = 0;

}