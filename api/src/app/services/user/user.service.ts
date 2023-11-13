import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../dtos/pagination.dto';
import { User } from '../../entities/User.entity';
import { Like, Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { Response } from 'express';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>,
        private readonly emailService: EmailService) { }

    /**
     * This method remind the pin of one user by the email given.
     * @param number, number of the user
     */
    async pinReminder(email: string, response: Response) {
        try {
            const user = await this.userRepository.findOne({ email: email });
            if (user == null) throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: `No user found for email: ${email}`,
            }, HttpStatus.NOT_FOUND);
            await this.emailService.sentEmail(user.email, 'CREDIT CARD MANAGER PIN REMINDER', user.pin);
            return response.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                status: 'success',
                message: 'PIN reminder sent successfully.',
            });
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `User Database Error: ${error.message}`,
            }, HttpStatus.FORBIDDEN);
        }
    }

}
