import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ connected to MongoDB");
    } catch (err) {
        console.error("❌ mongoDB error:", err);
        process.exit(1);
    }
};

export const disconnectDB = async () => mongoose.disconnect();