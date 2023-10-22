import { Injectable } from '@nestjs/common';
import { HealthMessaje } from './health.types';

@Injectable()
export class HealthService {
  /**
   * Return a message in object to indicate if the service is up
   * @returns {HealthMessaje}
   */
  getHealth(): HealthMessaje {
    return {
      status: 'UP',
    };
  }
}
