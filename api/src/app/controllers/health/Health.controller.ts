import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../../services/health/health.service';
import { ApiTags } from '@nestjs/swagger';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) { }

  @Get()
  @Public()
  getHealth() {
    return this.healthService.getHealth();
  }
}
