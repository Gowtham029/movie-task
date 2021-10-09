import { Module } from "@nestjs/common";
import { ReviewService } from "./reviews.service";
import { MongooseModule } from "@nestjs/mongoose";
import { reviewConstants } from "./reviews.const";
import { ReviewSchema } from "./schema/review.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: reviewConstants.REVIEW_SCHEMA,
                schema: ReviewSchema,
            },
        ]),
    ],
    controllers: [],
    providers: [ReviewService],
    exports: [ReviewService],
})
export class ReviewModule {}
