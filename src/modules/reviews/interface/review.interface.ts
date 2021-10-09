import { Document } from "mongoose";


export interface Review extends Document {
    movieId: string;
    description: string;
    rating: number;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
}
