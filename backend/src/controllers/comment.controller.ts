import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { CommentService } from "../services/comment.service";
import { TokenService } from "../services/token.service";
import { createCommentSchema, updateCommentSchema, CreateCommentInput, UpdateCommentInput } from "../schemas/comment.schema";

@injectable()
export class CommentController{
    constructor(
        private commentService: CommentService,
        private tokenService: TokenService
    ){}

    public async getComments(req: Request, res: Response, next: NextFunction){
        try {
            const comments = await this.commentService.getComments();

            res.status(200).json({
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

            res.status(200).json({
                comment: comment,
            })
        } catch (error) {
            next(error);
        }
    }

    public async createComment(req: Request, res: Response, next: NextFunction){
        try {
            const commentData: CreateCommentInput = createCommentSchema.parse(req.body)
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const comment = await this.commentService.createComment({
                content: commentData.content,
                postId: commentData.postId,
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
            const commentData: UpdateCommentInput = updateCommentSchema.parse(req.body)
            const token = await this.tokenService.verifyToken(this.tokenService.getToken(req))
            const comment = await this.commentService.updateComment({
                _id: commentId,
                content: commentData.content,
                userId: token.userId
            })

            res.status(200).json({
                message: "Comment updated",
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
            const deletedComment = await this.commentService.deletComment({
                _id: commentId,
                userId: token.userId
            })

            res.status(200).json({
                message: "Comment deleted",
                comment: deletedComment,
            })
        } catch (error) {
            next(error);
        }
    }
}