import mongoose from "mongoose";

export interface UserInterface {
    _id?: mongoose.Types.ObjectId
    email: string
    password: string
    lastname: string
    firstname: string
    avatar?: string
    description?: string
    createdAt?: Date
    updatedAt?: Date
}