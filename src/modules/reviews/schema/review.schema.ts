import * as mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema(
    {
        movieId: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String },
    },
    { timestamps: true, versionKey: false },
);
