/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
    Param,
    Query,
    HttpException,
    Put,
    Patch,
    Req,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiResponse,
    ApiTags,
    ApiBody,
    ApiParam,
    ApiQuery,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { CreateUpdateUserResponseDto } from "./dto/create-update-user-response.dto";
import { AuthService } from "../../common/middlewares/auth/auth.service";
import { PatchUserDto } from "./dto/patch-user.dto";
import { User } from "./interface/user.interface";

@UsePipes(ValidationPipe)
@Controller("users")
@ApiTags("users")
@ApiBearerAuth()
export class UserController {
    public constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get("/")
    @ApiQuery({ name: "skip", example: 0 })
    @ApiQuery({ name: "limit", example: 0 })
    async getAllUsers(@Query() query) {
        const limit = query.limit ? Number(query.limit) : 10;
        const skip = query.skip ? Number(query.skip) : 0;
        const result = await this.userService.getUsers(skip, limit);
        return result;
    }

    @Get("/me")
    async getSessionUser(@Req() request): Promise<User> {
        console.log(request.user);
        const result = await this.userService.getUserById(
            request.user._id,
        );
        return result;
    }

    @Get("/:id")
    @ApiParam({ name: "id", description: "Id of the user" })
    async getUserById(@Param("id") id: string) {
        if (!id) {
            throw new HttpException("Provide Valid Id", HttpStatus.BAD_REQUEST);
        }
        const result = await this.userService.getUserById(id);
        return result;
    }

    @Patch("/:id")
    @ApiBody({ type: PatchUserDto })
    async patchUser(
        @Body() patchUserDto: PatchUserDto,
        @Param("id") id: string,
    ): Promise<void> {
        if (!id) {
            throw new HttpException("Provide Valid Id", HttpStatus.BAD_REQUEST);
        }
        const result = await this.userService.update(id, patchUserDto);
        return result;
    }
}
