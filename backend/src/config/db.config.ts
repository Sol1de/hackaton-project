import mongoose, { Model } from 'mongoose'
import { connectDB } from "./db.connection"
import { User } from "../models/users.model"
import { Post } from "../models/posts.model"
import { Comment } from "../models/comments.model"
import { Token } from "../models/tokens.model"

const models: Model<any>[] = [
    User,
    Post,
    Comment,
    Token
]

async function collectionExists(model: Model<any>): Promise<boolean> {
    if (!mongoose.connection.db) {
        throw new Error('Connection to MongoDB not established')
    }
    const collections = await mongoose.connection.db.listCollections().toArray()
    return collections.some(col => col.name === model.collection.name)
}

async function createCollection(model: Model<any>): Promise<void> {
    if (!mongoose.connection.db) {
        throw new Error('Connection to MongoDB not established')
    }
    await model.createCollection()
}

async function main() {
    try {
        await connectDB()

        const collectionChecks = models.map(async (model) => {
            const exists = await collectionExists(model)

            if (!exists) {
                console.log(`Creating collection: ${model.collection.name}`)
                await createCollection(model)
            }

            console.log(`Collection ${model.collection.name} exists:`, exists)
        })

        await Promise.all(collectionChecks)
        console.log('All collections initialized successfully')
    } catch (error) {
        console.error('Error during initialization:', error)
        process.exit(1)
    }
}

main()
    .then(() => console.log("Collections initialization complete"))
    .then(() => process.exit(0))