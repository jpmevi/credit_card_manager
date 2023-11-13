import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountLogService } from '../../services/account-log/account-log.service';

@ApiTags('Account Log')
@Controller('account-log')
export class AccountLogController {

    constructor(private accountLogService : AccountLogService) {}


}
