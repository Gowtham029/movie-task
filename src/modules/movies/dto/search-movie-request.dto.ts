import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class SearchMovieRequestDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    from: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    to: number;

    @ApiProperty()
    @IsString()
    searchText: string;

    @ApiProperty({ enum: ["asc", "desc"] })
    @IsString()
    @IsNotEmpty()
    sortBy: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    sortKey: string;
}
