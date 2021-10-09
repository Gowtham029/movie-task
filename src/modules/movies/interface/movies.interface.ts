import { Document } from "mongoose";

interface ReviewDetails {
    total: number;
    average: number;
    score: number;
}

export interface Movie extends Document {
    movieName: string;
    movieGenre: string;
    releaseDate: Date;
    description?: string;
    upVotes?: number;
    downVotes?: number;
    review?: ReviewDetails;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
}
