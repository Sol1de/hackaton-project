import { Post } from "../models/posts.model"
import { PostInterface } from "../types/post.type"
import mongoose from "mongoose"
import { PostError } from "../errors/post.error"

export class PostService {
    private validateObjectId(id: string): void {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw PostError.invalidPostId(id)
        }
    }

    async getPosts(){
        return Post.find().sort({createdAt: -1}).populate('userId', 'firstname lastname email avatar')
    }

    async getPost(postId: string){
        this.validateObjectId(postId)
        const post = await Post.findOne({ _id: postId }).populate('userId', 'firstname lastname email avatar')

        if (!post) {
            throw PostError.postNotFound(postId)
        }

        return post
    }

    async createPost(content: string, title: string, userId: mongoose.Types.ObjectId){
        if (!content || !title) {
            throw PostError.invalidPostData({ 
                content: !content ? "Content is required" : undefined,
                title: !title ? "Title is required" : undefined
            })
        }

        const post: PostInterface = {
            content,
            userId,
            title
        }

        try {
            return await Post.create(post)
        } catch (error) {
            throw PostError.createPostFailed()
        }
    }

    async updatePost(id: string, content: string){
        this.validateObjectId(id)
        if (!content) {
            throw PostError.invalidPostData({ content: "Content is required" })
        }
        const updatedPost = await Post.findByIdAndUpdate(id, { content }, { new: true })
        if (!updatedPost) {
            throw PostError.postNotFound(id)
        }

        return updatedPost
    }

    async deletePost(id: string){
        this.validateObjectId(id)
        const deletedPost = await Post.findByIdAndDelete(id)
        if (!deletedPost) {
            throw PostError.postNotFound(id)
        }

        return deletedPost
    }
}