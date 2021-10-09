import { ApiProperty } from "@nestjs/swagger";
import { MovieDto } from "./movie.dto";

export class MovieListDto {
    @ApiProperty()
    movies: MovieDto[];
}
