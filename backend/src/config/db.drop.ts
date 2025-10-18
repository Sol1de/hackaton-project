import mongoose from "mongoose"
import { connectDB } from "./db.connection"

export const dropDatabase = async () => {
    try {
        await connectDB()

        if (!mongoose.connection.db) {
            throw new Error('Connection to MongoDB not established')
        }

        const dbName = mongoose.connection.db.databaseName
        await mongoose.connection.db.dropDatabase()

        console.log(`✅ Database "${dbName}" has been dropped`)

        await mongoose.disconnect()
        console.log('✅ Disconnected from MongoDB')
        process.exit(0)
    } catch (error) {
        console.error('❌ Error dropping database:', error)
        process.exit(1)
    }
}

dropDatabase().then(() => console.log("Database drop complete"))
