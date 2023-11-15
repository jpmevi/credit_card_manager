import { Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginationDto } from '../../dtos/pagination.dto';
import { User } from '../../entities/User.entity';
import { UserService } from '../../services/user/user.service';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    /**
     * This endpoint send a pin reminder to the email specified.
     * @param email 
     * @returns 
     */
    @Public()
    @Get('/reminder/:email')
    async pinReminder(@Param('email') email: string, @Res() response: Response): Promise<any> {
        return this.userService.pinReminder(email, response);
    }

}
