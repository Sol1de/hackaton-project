import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    avatar: String,

    description: String,
}, {
    timestamps: true
})

// Hook pour supprimer en cascade tous les posts de l'utilisateur
userSchema.pre('findOneAndDelete', async function(next) {
    try {
        const userId = this.getQuery()._id

        // Import dynamique pour éviter les dépendances circulaires
        const { Post } = await import('./posts.model')

        // Supprimer tous les posts de l'utilisateur
        await Post.deleteMany({ userId: userId })

        next()
    } catch (error) {
        next(error as Error)
    }
})

export const User = mongoose.model('User', userSchema)