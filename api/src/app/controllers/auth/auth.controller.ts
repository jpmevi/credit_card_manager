import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { AuthDto } from '../../dtos/auth.dto ';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDto } from '../../dtos/pagination.dto';
import { User } from '../../entities/User.entity';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Log In Successful. Token generated.',
  })
  @ApiResponse({
    status: 404,
    description: `Not Found. No user found for username: {username}`,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid Password.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
  @Public()
  @Post('login')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.logIn(authDto.username, authDto.pin);
  }

  @ApiResponse({
    status: 200,
    description: 'Log Out Successful.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })

  @Post('logout')
  async logout(@Request() req): Promise<{}> {
    return {
      code: HttpStatus.OK,
      status: 'success',
      message: 'Logout succesful.',
    };
  }
}
