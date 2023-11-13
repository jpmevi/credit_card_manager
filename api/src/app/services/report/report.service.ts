import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../entities/Account.entity';
import { Transaction } from '../../entities/Transaction.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class ReportService {

    constructor(@InjectRepository(Account) private reportRepository: Repository<Account>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) { }

    /**
     * This method counts the number of accounts and group them by status.
     * @returns [{amount: number, status: string}]
     */
    async getAccountsReport(): Promise<any[]> {
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
    async getAccountDetailReport(number: string): Promise<Account> {
        var account = await this.reportRepository.findOne({
            relations: ['user'],
            where: { number: number }
        }).then(account => account);
        if (account == null) throw new NotFoundException('Account with that Credit card number not found');
        return account;
    }

    /**
     * This method returns all transactions in the database.
     * @returns 
     */
    async getMovementsReport(): Promise<any[]> {
        return await this.transactionRepository.createQueryBuilder("transaction")
            .select('*')
            .getRawMany();
    }

    /**
     * This method returns all transactions of one account by number
     * @returns 
     */
    async getMovementsDetailReport(number: number): Promise<any[]> {
        return await this.transactionRepository.createQueryBuilder("transaction")
            .select('*')
            .where(`account_number = ${number}`)
            .getRawMany();
    }

}
