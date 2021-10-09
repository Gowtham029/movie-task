import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, IsOptional, IsString } from "class-validator";

export class PatchUserDto {
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastName: string;
    
    @ApiPropertyOptional()
    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    favoriteGenres: string[];

    updatedBy?:string;
}
