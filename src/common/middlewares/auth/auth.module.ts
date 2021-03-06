import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        JwtModule.register({
            secret: "Hell0W0rld@20@)",
            signOptions: { expiresIn: "3600s" },
        }),
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
