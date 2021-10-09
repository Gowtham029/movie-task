import { required } from "@hapi/joi";
import * as mongoose from "mongoose";

export const UsersSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String },
        userName: { type: String, required: true },
        password: { type: String, required: true },
        status: { type: Boolean, required: true },
        favoriteGenres: [{ type: String }],
        lastLogin: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String },
        updatedAt: { type: Date, default: Date.now },
        updatedBy: { type: String },
    },
    { timestamps: true, versionKey: false },
);
