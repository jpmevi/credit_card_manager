import { Controller } from '@nestjs/common';
import { AccountLogService } from 'src/app/services/account-log/account-log.service';

@Controller('account-log')
export class AccountLogController {

    constructor(private accountLogService : AccountLogService) {}


}
