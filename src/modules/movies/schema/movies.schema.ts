import * as mongoose from "mongoose";

export const MovieSchema = new mongoose.Schema(
    {
        movieName: { type: String, required: true, unique: true },
        movieGenre: { type: String, required: true },
        description: { type: String },
        releaseDate: { type: Date, required: true },
        upVotes: { type: Number, default: 0 },
        downVotes: { type: Number, default: 0 },
        review: {
            total: { type: Number, default: 0 },
            score: { type: Number, default: 0 },
            average: { type: Number, default: 0 },
        },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String },
    },
    { timestamps: true, versionKey: false },
);
MovieSchema.index({ "$**": "text", movieName: "text" });
MovieSchema.path("movieName").unique(true);
