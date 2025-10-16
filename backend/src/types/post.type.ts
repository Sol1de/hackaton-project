import mongoose from "mongoose"

export interface PostInterface {
    _id?: mongoose.Types.ObjectId
    userId: mongoose.Types.ObjectId
    title: string
    content: string
    createdAt?: Date
    updatedAt?: Date
}