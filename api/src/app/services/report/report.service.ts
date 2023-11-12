import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/app/entities/Account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Account) private accountRepository : Repository<Account> ) { }

    /**
     * This method counts the number of accounts and group them by status.
     * @returns [{amount: number, status: string}]
     */
    async getAccountsReport() : Promise<any[]>{
       return await this.accountRepository.createQueryBuilder("account")
        .select(`COUNT(status)`, "amount")
        .addSelect("status", "status")
        .addGroupBy("status")
        .getRawMany();
    }

    async getAccountDetailReport(number : string) : Promise<any> {
        var account =  await this.accountRepository.findOne({where :{ number: number }}).then(account => account);
        if(account == null) throw new NotFoundException('Account with that Credit card number not found');
        return account;
    }

}
