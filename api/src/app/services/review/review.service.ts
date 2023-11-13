import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { Review } from 'src/app/entities/Review.entity';
import { Like, Not, Repository } from 'typeorm';
import { CreateReviewDto, UpdateReviewDto } from 'src/app/dtos/review.dto';
import { User } from 'src/app/entities/User.entity';
import { UserService } from '../user/user.service';
import { Response } from 'express';
import { reviewsTransformer } from './review.transformer';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    //private userRepository: UserService, // private accountLogService: AccountLogService
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  /**
   * This method returns a paginated list of no deleted accounts.
   * @param limit, number of elements
   * @param offset, number of page
   * @param pattern, pattern to search
   * @returns
   */
  async getReviews({
    limit,
    offset,
    pattern,
  }: PaginationDto): Promise<Review[]> {
    const reviews = await this.reviewRepository.find({
      relations: ['user'],
      order: {
        updatedAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });


    // Retorna
    return reviewsTransformer.transformReviewsAndUsers(reviews);

}

  /**
   * This method returns a paginated list of reviews by username.
   * @param username, username of reviews
   * @param limit  amount of elements
   * @param offset page number
   * @returns
   */
  async getReviewsByUsername(
    { limit, offset }: PaginationDto,
    username: string,
  ): Promise<Review[]> {
     // Verificar si el usuario existe antes de ejecutar la consulta
  const user = await this.userRepository.findOne({ username })

 if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `User with username ${username} does not exist.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
     const reviews = await this.reviewRepository.find({
      skip: offset,
      take: limit,
      order: {
        updatedAt: 'DESC',
      },
      where: {
        user: { username: username },
      },
    });
    return reviewsTransformer.transformReviews(reviews);
  }

  /**
   *
   * @param createReviewDto
   * @returns
   */
  async createReview(createReviewDto: CreateReviewDto) {
    try {
      // Verificar que exista el usuario
      const user = await this.userRepository.findOne({
        username: createReviewDto.username,
      });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `Username ${createReviewDto.username} does not exist.`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      createReviewDto.user = user;
      const review = this.reviewRepository.create(createReviewDto);
      await this.reviewRepository.save(review);

      //   return this.userRepository.find({
      //     where: { username: user.username },
      //     relations: ['reviews'],
      //   });
      return reviewsTransformer.transformReviewAndUser(review);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }

  /**
   * This method deletes an review by id.
   * @param id, id of the review
   */
  async deleteReview(id: number) {
    try {
      const review = await this.reviewRepository.findOne({ id: id });
      if (review == null)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: `No reviews found for Id: ${id}`,
          },
          HttpStatus.NOT_FOUND,
        );
      await this.reviewRepository.delete(id);
      return {
        code: HttpStatus.OK,
        status: 'success',
        message: 'Review deleted successfully.',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new BadRequestException(error);
      }
    }
  }
}
