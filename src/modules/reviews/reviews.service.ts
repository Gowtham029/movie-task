/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { reviewConstants } from "./reviews.const";
import { Review } from "./interface/review.interface";
import { Model } from "mongoose";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(reviewConstants.REVIEW_SCHEMA)
        private readonly reviewModel: Model<Review>,
    ) {}

    async getReviews(skip: number, limit: number): Promise<Review[]> {
        const result = await this.reviewModel
            .find({})
            .limit(limit)
            .skip(skip)
            .sort({ reviewName: "asc" });
        return result;
    }

    async create(
        createReviewDto: CreateReviewDto,
        authData: any,
    ): Promise<void> {
        const exitingReview = await this.getReviewByUserAndMovieId(
            createReviewDto.movieId,
            authData._id,
        );
        if (exitingReview) {
            throw new HttpException(
                "You Already Reviewed",
                HttpStatus.CONFLICT,
            );
        }
        createReviewDto.createdBy = authData._id;
        const result = await this.reviewModel.create(createReviewDto);
        await result.save();
    }

    async getReviewByUserAndMovieId(movieId, createdBy): Promise<Review> {
        const result = await this.reviewModel.findOne({ movieId, createdBy });
        return result;
    }
}
