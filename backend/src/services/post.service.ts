import { Post } from "../models/posts.model";
import { PostInterface } from "../types/post.type";
import mongoose from "mongoose";

export class PostService {

    async getPosts(){
        return Post.find().sort({createdAt: -1}).populate('userId', 'firstname lastname email avatar')
    }

    async createPost(content: string, title: string, userId: mongoose.Types.ObjectId){
        const post: PostInterface = {
            content,
            userId,
            title
        }

        return Post.create(post);
    }

    async updatePost(id: string, content: string){
        return await Post.findByIdAndUpdate(id, { content }, { new: true });
    }

    async deletePost(id: string){
        return await Post.findByIdAndDelete(id);
    }
}