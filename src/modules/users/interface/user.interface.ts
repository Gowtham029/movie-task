import { Document } from "mongoose";

export interface User extends Document {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    status: boolean;
    favoriteGenres?: string[];
    lastLogin?: Date;
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
}
