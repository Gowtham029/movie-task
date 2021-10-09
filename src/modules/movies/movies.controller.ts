/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    Controller,
    Get,
    Query,
    Req,
    Post,
    UsePipes,
    ValidationPipe,
    Body,
    Put,
    Param,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { MovieService } from "./movies.service";
import {
    ApiQuery,
    ApiBearerAuth,
    ApiTags,
    ApiBody,
    ApiResponse,
    ApiParam,
    ApiOkResponse,
} from "@nestjs/swagger";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie";
import { SearchMovieRequestDto } from "./dto/search-movie-request.dto";
import { Movie } from "./interface/movies.interface";
import { SearchMovieResponseDto } from "./dto/search-movie-response.dto";
import { CreateReviewDto } from "../reviews/dto/create-review.dto";
import { MovieDto } from "./dto/movie.dto";
import { MovieListDto } from "./dto/list-movie";

@UsePipes(ValidationPipe)
@Controller("movies")
@ApiTags("movies")
export class MovieController {
    public constructor(private readonly movieService: MovieService) {}

    @ApiBearerAuth()
    @Get("/")
    @ApiQuery({ name: "skip", example: 0 })
    @ApiQuery({ name: "limit", example: 10 })
    @ApiResponse({ type: MovieListDto, description: "response" })
    async getMovies(@Query() query): Promise<Movie[]> {
        const limit = query.limit ? Number(query.limit) : 10;
        const skip = query.skip ? Number(query.skip) : 0;
        const result = await this.movieService.getMovies(skip, limit);
        return result;
    }

    @ApiBearerAuth()
    @Get("/:id")
    @ApiParam({ name: "id", description: "Id of the Movie" })
    @ApiResponse({ type: MovieDto, description: "response" })
    async getMovieById(@Param("id") id: string) {
        if (!id) {
            throw new HttpException("Provide Valid Id", HttpStatus.BAD_REQUEST);
        }
        const result = await this.movieService.getMovieById(id);
        return result;
    }

    @ApiBearerAuth()
    @Post("/")
    @ApiBody({ type: CreateMovieDto })
    async createUser(@Body() createMovieDto: CreateMovieDto, @Req() request) {
        const authData = request.user;
        const result = await this.movieService.create(createMovieDto, authData);
        return result;
    }

    @Post("/search")
    @ApiBody({ type: SearchMovieRequestDto })
    @ApiResponse({ type: SearchMovieResponseDto, description: "response" })
    async searchMovie(
        @Body() searchMovie: SearchMovieRequestDto,
    ): Promise<SearchMovieResponseDto> {
        const result = await this.movieService.searchMovie(searchMovie);
        return result;
    }

    @Post(":movieId/vote")
    @ApiOkResponse()
    @ApiBearerAuth()
    @ApiQuery({ name: "vote", enum: ["LIKE", "UNLIKE"] })
    async vote(
        @Query("vote") vote: string,
        @Param("movieId") movieId: string,
    ): Promise<void> {
        await this.movieService.updateVote(movieId, vote);
    }

    @Post(":movieId/review")
    @ApiBody({ type: CreateReviewDto })
    @ApiBearerAuth()
    async addReview(
        @Body() reviewData: CreateReviewDto,
        @Param("movieId") movieId: string,
        @Req() request,
    ): Promise<void> {
        await this.movieService.addReview(movieId, reviewData, request.user);
    }
}
