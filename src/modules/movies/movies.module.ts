import { Module } from "@nestjs/common";
import { MovieService } from "./movies.service";
import { MongooseModule } from "@nestjs/mongoose";
import { movieConstants } from "./movies.const";
import { MovieSchema } from "./schema/movies.schema";
import { MovieController } from "./movies.controller";
import { ReviewModule } from "../reviews/reviews.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: movieConstants.MOVIE_SCHEMA,
                schema: MovieSchema,
            },
        ]),
        ReviewModule
    ],
    controllers: [MovieController],
    providers: [MovieService],
    exports: [],
})
export class MovieModule {}
