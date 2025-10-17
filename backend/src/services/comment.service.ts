import { CommentInterface, CreateCommentInterface, UpdateCommentInterface, DeleteCommentInterface } from '../types/comment.type'
import { Comment } from '../models/comments.model'
import mongoose from 'mongoose'
import { CommentError } from '../errors/comment.error';



export class CommentService {
    private validateObjectId(id: string): void {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw CommentError.invalidCommentId(id);
        }
    }

    async getComments(){
        return Comment.find().sort({createdAt: -1}).populate('userId', 'firstname lastname email avatar');
    }

    async getComment(commentId: string){
        this.validateObjectId(commentId);
        const comment = await Comment.findOne({ _id : commentId}).populate('userId', 'firstname lastname email avatar');
        if(!comment){
            throw CommentError.commentNotFound(commentId);
        }
        return comment;
    }

    async createComment(commentData: CreateCommentInterface){
        if(!commentData.content){
            throw CommentError.invalidCommentData({
                content: !commentData.content ? "Content is required" : undefined,
            })
        }

        const comment: CreateCommentInterface = {
            content: commentData.content,
            userId: commentData.userId,
            postId: commentData.postId
        }

        try {
            return await Comment.create(comment);
        } catch (error) {
            throw CommentError.commentCreationFailed();
        }
    }

    async updateComment(commentData: UpdateCommentInterface){
        this.validateObjectId(commentData._id);

        if(!commentData.content){
            throw CommentError.invalidCommentData({
                message: "At least one field must be provided"
            })
        }

        const comment = await Comment.findById(commentData._id);
        if(!comment){
            throw CommentError.commentNotFound(commentData._id)
        }
        if(comment.userId.toString() !== commentData.userId?.toString()){
            throw CommentError.unauthorizedCommentAccess();
        }

        const updateData: Partial<CommentInterface> = {
            content: commentData.content
        }

        return Comment.findByIdAndUpdate(commentData._id, updateData, { new: true });
    }

    async deletComment(commentData: DeleteCommentInterface){
        this.validateObjectId(commentData._id)

        const comment = await Comment.findById(commentData._id);
        if(!comment){
            throw CommentError.commentNotFound(commentData._id)
        }
        if(comment.userId.toString() !== commentData.userId.toString()){
            throw CommentError.unauthorizedCommentAccess();
        }

        return Comment.findByIdAndDelete(commentData._id);
    }
}