import { Controller, Get, Param, Query } from '@nestjs/common';
import { Account } from 'src/app/entities/Account.entity';
import { ReportService } from 'src/app/services/report/report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService : ReportService) { }


    /**
     * This endpoint returns a list of accounts and group them by status.
     * @returns [{amount: number, status: string}]
     */
    @Get('/accountsReport')
    async getAccountsReport() : Promise<any[]> {
        return this.reportService.getAccountsReport();
    }

    /**
     * This endpoint returns the account and details that matches with number received as parameter.
     * @param number 
     * @returns 
     */
    @Get('/accountDetailReport/:number')
    async getAccountDetailReport(@Param('number') number) : Promise<Account> {
        return this.reportService.getAccountDetailReport(number);
    }

}
