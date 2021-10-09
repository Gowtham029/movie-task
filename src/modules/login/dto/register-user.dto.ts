import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsDateString,
} from "class-validator";

export class RegisterUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    status: boolean;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    lastLogin: Date;
}
