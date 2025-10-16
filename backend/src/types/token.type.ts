import mongoose from "mongoose";

export interface TokenInterface {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    ipAdress: string
    userAgent: string
    token: string
    expiresAt: Date
    createdAt?: Date
    updatedAt?: Date
}

export interface TokenPayloadInterface {
    userId: mongoose.Types.ObjectId
    expiresAt: Date
    ipAdress: string
    userAgent: string
}