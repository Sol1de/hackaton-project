import mongoose from "mongoose"

export interface CommentInterface {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    postId: mongoose.Types.ObjectId
    content: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CreateCommentInterface {
    content: string
    postId: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
}

export interface UpdateCommentInterface{
    _id: string
    content?: string
    userId?: mongoose.Types.ObjectId
}

export interface DeleteCommentInterface {
    _id: string
    userId: mongoose.Types.ObjectId
}