import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleProvider } from '../../providers/example/example.provider';
import ExampleRepository from '../../repositories/Example.repository';
import { ExampleTransformer } from '../../transformers/Example.tranformer';
import { ExampleService } from './Example.service';

describe('exampleService', () => {
  let service: ExampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExampleService,
        ExampleRepository,
        ExampleProvider,
        ExampleTransformer,
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<ExampleService>(ExampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
