import mongoose from "mongoose"

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

export interface CreateUserInterface {
    email: string
    password: string
    firstname: string
    lastname: string
    avatar?: string
    description?: string
}

export interface UpdateUserInterface {
    _id: string
    email?: string
    firstname?: string
    lastname?: string
    avatar?: string
    description?: string
    userId: mongoose.Types.ObjectId
}

export interface UpdatePasswordInterface {
    token: string
    newPassword: string
    confirmPassword: string
}

export interface DeleteUserInterface {
    _id: string
    userId: mongoose.Types.ObjectId
}