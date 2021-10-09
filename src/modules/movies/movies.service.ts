/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    HttpCode,
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { movieConstants } from "./movies.const";
import { Movie } from "./interface/movies.interface";
import { Model } from "mongoose";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { SearchMovieResponseDto } from "./dto/search-movie-response.dto";
import { CreateReviewDto } from "../reviews/dto/create-review.dto";
import { ReviewService } from "../reviews/reviews.service";

@Injectable()
export class MovieService {
    constructor(
        @InjectModel(movieConstants.MOVIE_SCHEMA)
        private readonly movieModel: Model<Movie>,
        private readonly reviewService: ReviewService,
    ) {}

    async getMovies(skip: number, limit: number): Promise<Movie[]> {
        const result = await this.movieModel
            .find({})
            .limit(limit)
            .skip(skip)
            .sort({ movieName: "asc" });
        return result;
    }

    async getMovieById(id: string): Promise<Movie> {
        const result = await this.movieModel.findById(id);
        if (!result) {
            throw new HttpException("Movie Not found", HttpStatus.NOT_FOUND);
        }
        return result;
    }

    async create(
        createMovieDto: CreateMovieDto,
        authData: any,
    ): Promise<Movie> {
        createMovieDto.createdBy = authData._id;
        const result = await this.movieModel.create(createMovieDto);
        return await result.save();
    }

    async update(
        _id: string,
        updateMovieDto: any,
        authData: any,
    ): Promise<void> {
        updateMovieDto.updatedBy = authData._id;
        const result = await this.movieModel.findByIdAndUpdate(
            _id,
            updateMovieDto,
        );
        await result.save();
    }

    async searchMovie(searchRequest: any): Promise<SearchMovieResponseDto> {
        const result = await this.movieModel
            .find({
                movieName: {
                    $regex: searchRequest.searchText,
                    $options: "i",
                },
            })
            .limit(searchRequest.to)
            .skip(searchRequest.from)
            .sort({ [searchRequest.sortKey]: searchRequest.sortBy });
        const count = await this.movieModel.find().count();
        const response = {
            total: count,
            movies: result,
        };
        return response;
    }

    async updateVote(_id: string, vote: string): Promise<void> {
        const movieData = await this.getMovieById(_id);
        const updateData: any = {};
        if (vote === "LIKE") {
            updateData["upVotes"] = movieData.upVotes + 1;
            updateData["downVotes"] =
                movieData.downVotes === 0 ? 0 : (movieData.downVotes -= 1);
        } else {
            updateData["upVotes"] =
                movieData.upVotes === 0 ? 0 : (movieData.upVotes -= 1);
            updateData["downVotes"] = movieData.downVotes + 1;
        }
        const result = await this.movieModel.findByIdAndUpdate(_id, updateData);
        await result.save();
    }

    async addReview(
        _id: string,
        reviewData: CreateReviewDto,
        authData: any,
    ): Promise<void> {
        const movieData = await this.getMovieById(_id);
        reviewData.movieId = _id;
        await this.reviewService.create(reviewData, authData);
        const total = movieData.review.total + 1;
        const score = movieData.review.score + reviewData.rating;
        const average = score / total;
        const reviewInfo = {
            total,
            score,
            average,
        };
        console.log(reviewInfo);
        const result = await this.movieModel.findByIdAndUpdate(_id, {
            review: reviewInfo,
        });
        await result.save();
    }
}
