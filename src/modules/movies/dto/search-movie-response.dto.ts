import { ApiProperty } from "@nestjs/swagger";
import { MovieDto } from "./movie.dto";

export class SearchMovieResponseDto {
    @ApiProperty()
    total: number;
    
    @ApiProperty()
    movies: MovieDto[];
}
