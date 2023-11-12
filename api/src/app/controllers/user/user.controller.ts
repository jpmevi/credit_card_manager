import { Controller, Delete, Get, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { User } from 'src/app/entities/User.entity';
import { UserService } from 'src/app/services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    /**
     * This endpoint send a pin reminder to the email specified.
     * @param email 
     * @returns 
     */
    @Get('/reminder/:email')
    async pinReminder(@Param('email') email: string, @Res() response: Response): Promise<any> {
        return this.userService.pinReminder(email, response);
    }
}
