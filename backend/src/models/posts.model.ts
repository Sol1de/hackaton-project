import mongoose from "mongoose"

const postsShema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true,
        maxlength: [100, 'The title must contain a maximum of 100 characters.']
    },

    content: {
        type: String,
        required: true,
        maxlength: [1000, 'The title must contain a maximum of 1000 characters.']
    },
    
})

export const Post = mongoose.model('Post', postsShema)