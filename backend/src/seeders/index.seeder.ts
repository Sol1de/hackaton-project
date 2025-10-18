import 'reflect-metadata'
import { injectable, container } from 'tsyringe'
import { UserSeeder } from "./user.seeder"
import { PostSeeder } from "./post.seeder"
import { CommentSeeder } from "./comment.seeder"
import { connectDB, disconnectDB } from "../config/db.connection"
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

@injectable()
export class IndexSeeder {
    constructor(
        private readonly userSeeder: UserSeeder,
        private readonly postSeeder: PostSeeder,
        private readonly commentSeeder: CommentSeeder
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

            const commentTexts = [
                "Great post! Thanks for sharing.",
                "Very interesting perspective!",
                "I completely agree with this.",
                "This is really helpful, thank you!",
                "Nice work on this post!",
                "Fascinating read!",
                "Thanks for the insights.",
                "Well written and informative.",
                "I learned something new today!"
            ]

            const createdUsers = await Promise.all(
                usersData.map(userData => this.userSeeder.createUser(userData))
            )

            const createdPosts = await Promise.all(
                createdUsers.flatMap(user =>
                    Array.from({ length: 3 }, (_, i) =>
                        this.postSeeder.createPost({
                            userId: user._id,
                            title: `Post ${i + 1} of ${user.firstname}`,
                            content: `This is a content from post ${i + 1} created by ${user.firstname} ${user.lastname}.`
                        })
                    )
                )
            )

            await Promise.all(
                createdUsers.flatMap((user, userIndex) =>
                    createdPosts.map((post, postIndex) =>
                        this.commentSeeder.createComment({
                            content: commentTexts[(userIndex * 3 + postIndex) % commentTexts.length],
                            userId: user._id,
                            postId: post._id.toString()
                        })
                    )
                )
            )

            await disconnectDB()
            console.log('✅ Disconnected from MongoDB')

        } catch (error) {
            console.error('❌ Seeding error:', error)
            await mongoose.disconnect()
            throw error
        }
    }
}

const indexSeeder = container.resolve(IndexSeeder)
indexSeeder.run().then(() => console.log("Seeding complete"))