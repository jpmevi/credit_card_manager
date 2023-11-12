import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from 'src/app/entities/Account.entity';
import { Transaction } from 'src/app/entities/Transaction.entity';
import { ReportService } from 'src/app/services/report/report.service';
@ApiTags('Report')
@Controller('report')
export class ReportController {

    constructor(private reportService: ReportService) { }


    /**
     * This endpoint returns a list of accounts and group them by status.
     * @returns [{amount: number, status: string}]
     */
    @Get('/accountsReport')
    async getAccountsReport(): Promise<any[]> {
        return this.reportService.getAccountsReport();
    }

    /**
     * This endpoint returns the account and details that matches with number received as parameter.
     * @param number 
     * @returns 
     */
    @Get('/accountDetailReport/:number')
    async getAccountDetailReport(@Param('number') number): Promise<Account> {
        return this.reportService.getAccountDetailReport(number);
    }

    /**
    * This endpoint returns a list of all account movements in the api.
    * @returns 
    */
    @Get('/movementsReport')
    @ApiResponse({
        status: 200,
        description: 'Success. Returns a list of movements.',
    })
    async getMovementsReport(): Promise<any[]> {
        return this.reportService.getMovementsReport();
    }

    /**
    * This endpoint returns a list of movements of one account by number.
    * @returns 
    */
    @ApiResponse({
        status: 200,
        description: 'Success. Returns a list of movements.',
    })
    @ApiResponse({
        status: 404,
        description: 'Not Found. No movements found for the provided account number.',
    })
    @Get('/movementsReport/:number')
    async getMovementsDetailReport(@Param('number') number): Promise<any[]> {
        return this.reportService.getMovementsDetailReport(number);
    }

}
