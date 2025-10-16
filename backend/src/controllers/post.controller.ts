import { inject, injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/post.service";
import { Post } from "../models/posts.model";

@injectable()
export class PostController {
    constructor(private postService: PostService) {}

    public async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await this.postService.getPosts();

            res.status(201).json({
                posts: posts,
            })
        } catch (error) {
            next(error);
        }
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { content, userId, title } = req.body;
            const newPost = await this.postService.createPost(content, userId, title)
            res.status(201).json(newPost)
        } catch (error) {
            next(error);
        }
    }

        public async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const updatedPost = await Post.findByIdAndUpdate(id, { content }, { new: true });
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.json({ message: "Post updated", post: updatedPost });
        } catch (error) {
            next(error);
        }
    }

    public async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const deletedPost = await Post.findByIdAndDelete(id);
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" });
            }
            res.json({ message: "Post deleted", post: deletedPost });
        } catch (error) {
            next(error);
        }
    }
}