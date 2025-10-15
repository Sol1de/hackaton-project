import mongoose from "mongoose";

const postsShema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        maxlength: [100, 'Le titre doit contenir 100 caractères max']
    },

    content: {
        type: String,
        required: true,
        maxlength: [1000, 'Le titre doit contenir 1000 caractères max']
    },
    
}); 

export const Post = mongoose.model('Post', postsShema);