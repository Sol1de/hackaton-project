import { injectable } from "tsyringe"
import { Request, Response, NextFunction } from "express"
import { PostService } from "../services/post.service"
import { Post } from "../models/posts.model"
import { TokenService } from "../services/token.service"

@injectable()
export class PostController {
    constructor(
        private postService: PostService,
        private tokenService: TokenService
    ) {}

    public async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await this.postService.getPosts()

            res.status(201).json({
                posts: posts,
            })
        } catch (error) {
            next(error)
        }
    }

    public async getPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params
            const post = await this.postService.getPost(postId)

            res.status(201).json({
                post: post,
            })
        } catch (error) {
            next(error)
        }
    }

    public async createPost(req: Request, res: Response, next: NextFunction) {
        try {
            const { content, title } = req.body
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const post = await this.postService.createPost(content, title, token.userId)

            res.status(201).json({
                post: post
            })
        } catch (error) {
            next(error)
        }
    }

        public async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const { content } = req.body
            const updatedPost = await Post.findByIdAndUpdate(id, { content }, { new: true })
            if (!updatedPost) {
                return res.status(404).json({ message: "Post not found" })
            }
            res.json({ message: "Post updated", post: updatedPost })
        } catch (error) {
            next(error)
        }
    }

    public async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const deletedPost = await Post.findByIdAndDelete(id)
            if (!deletedPost) {
                return res.status(404).json({ message: "Post not found" })
            }
            res.json({ message: "Post deleted", post: deletedPost })
        } catch (error) {
            next(error)
        }
    }
}