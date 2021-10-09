import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
} from "class-validator";

export class CommonMovieDataDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    createdAt: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    createdBy: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    updatedAt: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    updatedBy: string;
}
