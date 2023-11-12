import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/app/entities/Account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Account) private reportRepository : Repository<Account> ) { }

    /**
     * This method counts the number of accounts and group them by status.
     * @returns [{amount: number, status: string}]
     */
    async getAccountsReport() : Promise<any[]>{
       return await this.reportRepository.createQueryBuilder("account")
        .select(`COUNT(status)`, "amount")
        .addSelect("status", "status")
        .addGroupBy("status")
        .getRawMany();
    }

    /**
     * This method returns the account and details that matches with number received as parameter.
     * @param number 
     * @returns 
     */
    async getAccountDetailReport(number : string) : Promise<Account> {
        var account =  await this.reportRepository.findOne({
            relations: ['user'],
            where :{ number: number }    
        }).then(account => account);
        if (account == null) throw new NotFoundException('Account with that Credit card number not found');
        return account;
    }

}
