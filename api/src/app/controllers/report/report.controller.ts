import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReportService } from 'src/app/services/report/report.service';

@Controller('report')
export class ReportController {

    constructor(private reportService : ReportService) { }


    @Get('/accountsReport')
    async getAccountsReport() : Promise<any[]> {
        return this.reportService.getAccountsReport();
    }

    @Get('/accountDetailReport/:number')
    async getAccountDetailReport(@Param() number : string) : Promise<any> {
        return this.reportService.getAccountDetailReport(number);
    }

}
