import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("❌ MONGO_URI is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ connected to MongoDB");
    } catch (err) {
        console.error("❌ mongoDB error:", err);
        process.exit(1);
    }
};