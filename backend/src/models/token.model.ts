import mongoose from "mongoose";

const tokenShema = new mongoose.Schema({

    token: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 

    createdAt: {
        type: Date,
        default: Date.now() + 86400000
    },

    updatedAt: {
        type: Date,
        default: Date.now() + 86400000
    }, 

    expiresAt: {

    }

})

export const Token = mongoose.model('Token', tokenShema);