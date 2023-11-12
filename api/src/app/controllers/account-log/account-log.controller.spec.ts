import { Test, TestingModule } from '@nestjs/testing';
import { AccountLogController } from './account-log.controller';

describe('AccountLogController', () => {
  let controller: AccountLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountLogController],
    }).compile();

    controller = module.get<AccountLogController>(AccountLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
