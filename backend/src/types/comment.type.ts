import mongoose from "mongoose";

export interface CommentInterface {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    postId: mongoose.Types.ObjectId
    content: string
    createdAt?: Date
    updatedAt?: Date
}