import { Test, TestingModule } from '@nestjs/testing';
import { AccountLogService } from './account-log.service';

describe('AccountLogService', () => {
  let service: AccountLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountLogService],
    }).compile();

    service = module.get<AccountLogService>(AccountLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
