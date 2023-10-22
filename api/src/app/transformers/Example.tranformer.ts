import { Injectable } from '@nestjs/common';
import { Example } from '../entities/Example.entity';

@Injectable()
export class ExampleTransformer {
  public exampleStatus(examples: Example[]) {
    const exampleMapped = examples.map((example) => {
      const { id, name, status } = example;
      return {
        id,
        name,
        status,
      };
    });
    return exampleMapped;
  }
}
