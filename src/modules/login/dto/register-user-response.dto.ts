import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class RegisterUserResponseDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    status: boolean;

    @ApiProperty()
    lastLogin: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    token: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    updatedBy: string;
}
