import { injectable } from "tsyringe"
import { Request, Response, NextFunction } from "express"
import { PostService } from "../services/post.service"
import { TokenService } from "../services/token.service"
import { createPostSchema, updatePostSchema, CreatePostInput, UpdatePostInput } from "../schemas/post.schema"

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
            const postData: CreatePostInput = createPostSchema.parse(req.body)
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const post = await this.postService.createPost({
                content: postData.content,
                title: postData.title,
                userId: token.userId
            })

            res.status(201).json({
                post: post
            })
        } catch (error) {
            next(error)
        }
    }

    public async updatePost(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params
            const postData: UpdatePostInput = updatePostSchema.parse(req.body)
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const updatedPost = await this.postService.updatePost({
                _id: postId,
                content: postData.content,
                title: postData.title,
                userId: token.userId
            })

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
            const { postId } = req.params
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const deletedPost = await this.postService.deletePost({
                _id: postId,
                userId: token.userId
            })

            res.status(200).json({ 
                message: "Post deleted", 
                post: deletedPost 
            })
        } catch (error) {
            next(error)
        }
    }
}