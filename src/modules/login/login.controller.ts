import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { LoginResponseDto } from "./dto/login-response.dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { AuthService } from "../../common/middlewares/auth/auth.service";
import { RegisterUserDto } from "./dto/register-user.dto";

@Controller("common")
@ApiTags("common")
export class LoginController {
    public constructor(
        private readonly loginService: LoginService,
        private readonly authService: AuthService,
    ) {}

    @Post("/login")
    @UsePipes(ValidationPipe)
    @ApiBody({ type: LoginRequestDto })
    @ApiResponse({ type: LoginResponseDto, description: "response" })
    async login(@Body() loginDto: LoginRequestDto): Promise<{ token }> {
        const result = await this.loginService.login(loginDto);
        const token = await this.authService.createAuthToken(result);
        return { token };
    }

    @Post("/register")
    @UsePipes(ValidationPipe)
    @ApiBody({ type: RegisterUserDto })
    @ApiResponse({ type: RegisterUserDto, description: "response" })
    async registerUser(
        @Body() createUserDto: RegisterUserDto,
    ): Promise<{ token }> {
        const result = await this.loginService.register(createUserDto);
        const token = await this.authService.createAuthToken(result);
        return { token };
    }
}
