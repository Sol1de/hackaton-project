import { injectable } from "tsyringe"
import { Request, Response, NextFunction } from "express"
import { PostService } from "../services/post.service"
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

            res.status(200).json({
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

            res.status(200).json({
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
            const updatedPost = await this.postService.updatePost(id, content)

            res.status(200).json({ 
                message: "Post updated", 
                post: updatedPost 
            })
        } catch (error) {
            next(error)
        }
    }

    public async deletePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const deletedPost = await this.postService.deletePost(id)

            res.status(200).json({ 
                message: "Post deleted", 
                post: deletedPost 
            })
        } catch (error) {
            next(error)
        }
    }
}