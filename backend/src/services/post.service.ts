import { Post } from "../models/posts.model";

export class PostService {

    constructor() {}

    async getPosts(){
        return await Post.find().sort({createdAt: -1}).populate('userId', 'username').populate('postId', 'title');
    }

    async createPost(content: string, userId: string, title: string){
        const post = {
            content,
            userId,
            title
        }

        const newPost = Post.create(post);
        return newPost
    }

    async updatePost(id: string, content: string){
        return await Post.findByIdAndUpdate(id, { content }, { new: true });
    }

    async deletePost(id: string){
        return await Post.findByIdAndDelete(id);
    }
}