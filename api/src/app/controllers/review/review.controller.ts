import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserAndAccountDto, UpdateUserAndAccountDto } from 'src/app/dtos/account.dto';
import { CreateReviewDto, UpdateReviewDto } from 'src/app/dtos/review.dto';

import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { Account } from 'src/app/entities/Account.entity';
import { Review } from 'src/app/entities/Review.entity';

import { AccountLogService } from 'src/app/services/account-log/account-log.service';
import { AccountService } from 'src/app/services/account/account.service';
import { ReviewService } from 'src/app/services/review/review.service';

@ApiTags('Review')
@Controller('review')
export class ReviewController {

    constructor(private reviewService: ReviewService) { }

    /**
     * This endpoint returns a paginated list of reviews.
     * @param pagination 
     * @returns  
     */
    @ApiResponse({ status: 200, description: 'Successful request.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
    @Get()
    async getReviewList(@Query() pagination: PaginationDto): Promise<Review[]> {
        return this.reviewService.getReviews(pagination);
    }

    /**
     * This endpoint returns a paginated list of no deleted accounts by username.
     * @param pagination 
     * @param username 
     * @returns 
     */
    @ApiResponse({ status: 200, description: 'Successful request.' })
    @ApiResponse({ status: 404, description: 'Not Found. Invalid username.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
    @Get('/:username')
    async getReviewListByUsername(@Query() pagination: PaginationDto, @Param('username') username: string): Promise<Review[]> {
        return this.reviewService.getReviewsByUsername(pagination, username);
    }

    // /**
    // * This endpoint deletes an account.
    // * @param number, number of credit card
    // */
    // @Delete('status/:number')
    // async disableAccount(@Param('number') number: string): Promise<void> {
    //     return this.accountService.changeAccountStatus(number, 'deleted');
    // }

    /**
     * This endpoint creates an account and a user.
     */
    @ApiResponse({ status: 201, description: 'The Review have been successfully created.', type: CreateReviewDto })
    @ApiResponse({ status: 404, description: 'Not Found. Invalid username.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Other errors.' })
    @Post()
    async createReview(@Body() CreateReviewDto: CreateReviewDto) {
        return this.reviewService.createReview(CreateReviewDto);
    }

    /**
    * This endpoint updates a review by review id
    */
    @ApiResponse({ status: 200, description: 'Successful update of the Review.' })
    @ApiResponse({ status: 404, description: 'Not Found. The Review was not found for the provided Id.' })
    @ApiResponse({ status: 400, description: 'Bad Request. Generic error in the request.' })
    @Patch('/:id')
    async updateReview(@Param('id') id: number, @Body() UpdateReviewDto: UpdateReviewDto) {
        return this.reviewService.updateReview(id, UpdateReviewDto);
    }


    /**
     * This endpoint deletes an account by number
     */
    @ApiResponse({ status: 200, description: 'Review deleted successfully.', })
    @ApiResponse({ status: 404, description: 'No Review found for the given id.', })
    @Delete('/:id')
    async deleteReview(@Param('id') id: number) {
        return this.reviewService.deleteReview(id);
    }

}
