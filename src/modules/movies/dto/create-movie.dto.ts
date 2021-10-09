import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
} from "class-validator";

export class CreateMovieDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    movieName: string;

    @ApiProperty({ name: "movieGenre", enum: ["ACTION", "COMEDY"] })
    @IsString()
    @IsNotEmpty()
    movieGenre: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    releaseDate: Date;

    createdAt?: Date;

    createdBy?: string;

    updatedAt?: Date;

    updatedBy?: string;
}
