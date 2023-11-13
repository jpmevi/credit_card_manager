import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../entities/Account.entity';
import { AccountLog } from '../../entities/AccountLog.entity';
import { Repository, getRepository } from 'typeorm';

@Injectable()
export class AccountLogService {

    constructor(@InjectRepository(AccountLog) private accountRepository: Repository<AccountLog>) {}

        /**
         * This method creates a new log.
         */
        async createLog(log :string, status : string, account : Account) : Promise<void>{
            let doe = new Date();
            let date = new Date();
            await getRepository(AccountLog).save({ doe, log, status, date, account });
        }

}


