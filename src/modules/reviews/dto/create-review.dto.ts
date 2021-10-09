import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class CreateReviewDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    rating: number;

    movieId:string;
    
    createdAt?: Date;

    createdBy?: string;

    updatedAt?: Date;

    updatedBy?: string;
}
