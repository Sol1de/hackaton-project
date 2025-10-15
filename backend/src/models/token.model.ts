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
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now()
    }, 

    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 86400000),
        index: { exprires: 0}
    }

})

export const Token = mongoose.model('Token', tokenShema);