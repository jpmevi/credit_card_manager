import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleProvider } from '../../providers/example/example.provider';
import ExampleRepository from '../../repositories/Example.repository';
import { ExampleService } from '../../services/example/Example.service';
import { ExampleTransformer } from '../../transformers/Example.tranformer';
import { ExampleController } from './Example.controller';

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        ExampleRepository,
        ExampleProvider,
        ExampleTransformer,
      ],
      imports: [HttpModule],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('FindAll function', () => {
    const result = [
      {
        id: 1,
        name: 'Example Name',
        status: 'ACTIVE',
        code: 'EX001',
        activationAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];
    it('should return an array of examples', async () => {
      jest.spyOn(controller, 'findAll').mockImplementation(async () => result);
      expect(await controller.findAll({ limit: 1, offset: 20 })).toBe(result);
    });
    it('Without send parameters', async () => {
      jest.spyOn(controller, 'findAll').mockImplementation(async () => result);
      expect(await controller.findAll({})).toBe(result);
    });
  });
});
