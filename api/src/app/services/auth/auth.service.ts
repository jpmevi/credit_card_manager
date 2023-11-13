import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { User } from 'src/app/entities/User.entity';
import { UserService } from '../user/user.service';
import { AuthDto } from 'src/app/dtos/auth.dto ';
import { Like, Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * This method login a user.
   * @param username
   * @param pin
   * @returns
   */
  async logIn(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne(username);
    if (user == null)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `No user found for username: ${username}`,
        },
        HttpStatus.NOT_FOUND,
      );
    const passwordValid = await bcrypt.compare(pass, user.pin);
    if (!passwordValid)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: `Invalid password.`,
        },
        HttpStatus.UNAUTHORIZED,
      );

    const payload = { sub: user.email, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
      role: user.role,
    };
  }

 
}
