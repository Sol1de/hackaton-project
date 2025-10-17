import mongoose from "mongoose"

export interface PostInterface {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    title: string
    content: string
    createdAt?: Date
    updatedAt?: Date
}

export interface CreatePostInterface {
    content: string
    title: string
    userId: mongoose.Types.ObjectId
}

export interface UpdatePostInterface {
    _id: string
    content?: string
    title?: string
    userId: mongoose.Types.ObjectId
}

export interface DeletePostInterface {
    _id: string
    userId: mongoose.Types.ObjectId
}