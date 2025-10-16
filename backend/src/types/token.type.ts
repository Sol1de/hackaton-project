import mongoose from "mongoose";

export interface TokenInterface {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    token: string
    expiresAt: Date
    createdAt?: Date
    updatedAt?: Date
}