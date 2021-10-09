import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AuthMiddleware } from "./common/middlewares/auth/auth.middleware";
import { AuthModule } from "./common/middlewares/auth/auth.module";
import { LoggerModule } from "./common/interceptors/logger/logger.module";
import { GlobalExceptionFilter } from "./common/filters/exception.filters";
import { UserModule } from "./modules/users/user.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./common/pipes/validation.pipe";
import { LoginModule } from "./modules/login/login.module";
import { MovieModule } from "./modules/movies/movies.module";
import { ReviewModule } from "./modules/reviews/reviews.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
        }),
        MongooseModule.forRoot(
            process.env.MONGO_DB_URI,
            { useCreateIndex: true, useNewUrlParser: true },
        ),
        AuthModule,
        LoggerModule,
        UserModule,
        LoginModule,
        MovieModule,
        ReviewModule,
    ],
    controllers: [AppController],
    providers: [
        GlobalExceptionFilter,
        { provide: APP_PIPE, useClass: ValidationPipe },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: "*", method: RequestMethod.ALL });
    }
}
