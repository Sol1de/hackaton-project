import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("❌ MONGO_URI n'est pas défini dans les variables d'environnement");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connecté à MongoDB !");
    } catch (err) {
        console.error("❌ Erreur MongoDB:", err);
        process.exit(1);
    }
};