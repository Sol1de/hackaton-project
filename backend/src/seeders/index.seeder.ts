import { UserSeeder } from "./user.seeder";
import { connectDB, disconnectDB } from "../config/db.connection";
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function runSeeders() {
    try {
        await connectDB();
        const userSeeder = new UserSeeder();

        // Créer des utilisateurs
        await userSeeder.createUser({
            email: 'john@exemple.com',
            password: 'password123',
            firstname: 'John',
            lastname: 'Doe',
            avatar: 'avatar1.jpg',
            description: 'Développeur passionné'
        });

        await userSeeder.createUser({
            email: 'jane@exemple.com',
            password: 'password456',
            firstname: 'Jane',
            lastname: 'Smith',
            avatar: 'avatar2.jpg',
            description: 'Designer créative'
        });

        await disconnectDB();

    } catch (error) {
        console.error('❌ seeding error:', error);
        await mongoose.disconnect();
    }
}

runSeeders().then(r => "✅ seeding completed");