import 'reflect-metadata'
import { injectable, container } from 'tsyringe'
import { UserSeeder } from "./user.seeder"
import { PostSeeder } from "./post.seeder"
import { connectDB, disconnectDB } from "../config/db.connection"
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

@injectable()
export class IndexSeeder {
    constructor(
        private readonly userSeeder: UserSeeder,
        private readonly postSeeder: PostSeeder
    ) {}

    async run() {
        try {
            await connectDB()

            const usersData = [
                {
                    email: 'john@exemple.com',
                    password: 'password',
                    firstname: 'John',
                    lastname: 'Doe',
                    avatar: 'avatar1.jpg',
                    description: 'Développeur passionné'
                },
                {
                    email: 'jane@exemple.com',
                    password: 'password',
                    firstname: 'Jane',
                    lastname: 'Smith',
                    avatar: 'avatar2.jpg',
                    description: 'Designer créative'
                },
                {
                    email: 'alice@exemple.com',
                    password: 'password',
                    firstname: 'Alice',
                    lastname: 'Johnson',
                    avatar: 'avatar3.jpg',
                    description: 'Chef de projet innovante'
                }
            ]

            const createdUsers = await Promise.all(
                usersData.map(userData => this.userSeeder.createUser(userData))
            )

            await Promise.all(
                createdUsers.map(user =>
                    Promise.all(
                        Array.from({ length: 3 }, (_, i) =>
                            this.postSeeder.createPost({
                                userId: user._id,
                                title: `Post ${i + 1} of ${user.firstname}`,
                                content: `This is a content from post ${i + 1} created by ${user.firstname} ${user.lastname}.`
                            })
                        )
                    )
                )
            )

            await disconnectDB()
            console.log('✅ Seeding completed')

        } catch (error) {
            console.error('❌ Seeding error:', error)
            await mongoose.disconnect()
            throw error
        }
    }
}

const indexSeeder = container.resolve(IndexSeeder)
indexSeeder.run()