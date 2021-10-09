import { ApiProperty } from "@nestjs/swagger";

export class MovieDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    movieName: string;

    @ApiProperty({ name: "movieGenre", enum: ["ACTION", "COMEDY"] })
    movieGenre: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    review?: any;

    @ApiProperty()
    upVotes?: number;

    @ApiProperty()
    downVotes?: number;

    @ApiProperty()
    releaseDate: Date;

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    createdBy?: string;

    @ApiProperty()
    updatedAt?: Date;

    @ApiProperty()
    updatedBy?: string;
}
