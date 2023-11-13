import { Injectable } from '@nestjs/common';
import { Review } from 'src/app/entities/Review.entity';

@Injectable()
export class ReviewsTramsformer {
  public transformReviewsAndUsers = (reviews: any) => {
    const result = reviews.map((review: any) => {
      return this.transformReviewAndUser(review);
    });

    return result;
  };

  public transformReviewAndUser = (review: any) => {
    const user = review.user;
    const transformedObject = {
      id: review.id,
      comment: review.comment,
      rate: review.rate,
      username: user.username,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };

    return transformedObject;
  };

  public transformReviews = (reviews: any) => {
    const result = reviews.map((review: any) => {
      return this.transform(review);
    });

    return result;
  };

  public transform = (review: any) => {
    const transformedObject = {
      id: review.id,
      comment: review.comment,
      rate: review.rate,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
    return transformedObject;
  };
}

export const reviewsTransformer = new ReviewsTramsformer();
