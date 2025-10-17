import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { CommentService } from "../services/comment.service";
import { TokenService } from "../services/token.service";

@injectable()
export class CommentController{
    constructor(
        private commentService: CommentService,
        private tokenService: TokenService
    ){}

    public async getComments(req: Request, res: Response, next: NextFunction){
        try {
            const comments = await this.commentService.getComments();

            res.json({
                comments: comments,
            })
        } catch (error) {
            next(error);
        }
    }

    public async getComment(req: Request, res: Response, next: NextFunction){
        try {
            const { commentId } = req.params
            const comment = await this.commentService.getComment(commentId);
            
            res.json({
                comment: comment,
            })
        } catch (error) {
            next(error);
        }
    }

    public async createComment(req: Request, res: Response, next: NextFunction){
        try {
            const { content, postId } = req.body
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const comment = await this.commentService.createComment({
                content,
                postId,
                userId: token.userId
            })

            res.status(201).json({
                comment: comment,
            })
        } catch (error) {
            next(error);
        }
    }

    public async updateComment(req: Request, res: Response, next: NextFunction){
        try {
            const { commentId } = req.params
            const { content } = req.body
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const comment = await this.commentService.updateComment({
                _id: commentId,
                content,
                userId: token.userId
            })

            res.json({
                message: "Comment updated successfully",
                comment: comment,
            })
        } catch (error) {
            next(error);
        }
    }

    public async deleteComment(req: Request, res: Response, next: NextFunction){
        try {
            const { commentId } = req.params
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const deleteComment = await this.commentService.deletComment({
                _id: commentId,
                userId: token.userId
            })

            res.json({
                message: "Comment deleted successfully",
                comment: deleteComment,
            })
        } catch (error) {
            next(error);
        }
    }
}