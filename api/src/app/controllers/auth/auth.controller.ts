import { Body, Controller, Post, HttpCode, HttpStatus , Request} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { AuthDto } from '../../dtos/auth.dto ';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDto } from '../../dtos/pagination.dto';
import { User } from '../../entities/User.entity';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body() authDto: Record<string, any>) {
    return this.authService.logIn(authDto.username, authDto.pin);
  }

  @Post('logout')
  async logout(@Request() req): Promise<{}> {
 
    return {
        code: HttpStatus.OK,
        status: 'success',
        message: 'Logout succesful.'
    };
  }
}