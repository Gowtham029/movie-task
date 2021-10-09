import { Test } from "@nestjs/testing";
import { LoginController } from "./login.controller";
import { AuthService } from "../../common/middlewares/auth/auth.service";
import { LoginService } from "./login.service";

const jwtToken = "jwt";

const loginResponse = {
    userName: "John",
    firstName: "John",
    lastName: "Cena",
    password: "123",
    status: true,
    favoriteGenres: ["ACTION"],
    lastLogin: expect.any(Date),
    createdAt: expect.any(Date),
    createdBy: "123",
    updatedAt: expect.any(Date),
    updatedBy: "123",
};

describe("Login Service", () => {
    let controller: LoginController;
    let loginService: LoginService;
    let authService: AuthService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                {
                    provide: LoginService,
                    useValue: {
                        login: jest.fn(),
                        register: jest.fn(),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        createAuthToken: jest.fn(),
                    },
                },
            ],
        }).compile();
        controller = module.get<LoginController>(LoginController);
        loginService = module.get<LoginService>(LoginService);
        authService = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
        expect(loginService).toBeDefined();
        expect(authService).toBeDefined();
    });

    it("Login - should able to login", async () => {
        (loginService.login as jest.Mock).mockResolvedValue(loginResponse);
        (authService.createAuthToken as jest.Mock).mockResolvedValue(jwtToken);
        const request = { userName: "1", password: "1" };
        const result = await controller.login(request);
        expect(loginService.login).toBeCalledWith(request);
        expect(authService.createAuthToken).toBeCalledWith(loginResponse);
        expect(result).toEqual({ token: jwtToken });
    });
});
