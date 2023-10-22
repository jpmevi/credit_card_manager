import { Example } from '../../entities/Example.entity';
import { UpdateResult } from 'typeorm';

export interface ResponseType {
  status: number;
  data: UpdateResult | Example | Example[];
  message: string | null;
}

export interface ExampleStatus {
  id: number;
  name: string;
  status: string;
}
