import createError from 'http-errors';
import { BaseError } from './base.error';

export class CommentError extends BaseError {
    static commentNotFound(commentId?: string): createError.HttpError {
        return this.create(
            404,
            "Comment not found",
            "COMMENT_NOT_FOUND",
            commentId ? {commentId, message : "The requested comment does not exist."} : {message: "The requested comment does not exist."}
        )
    }

    static invalidCommentId(commentId: string): createError.HttpError {
        return this.create(
            400,
            "Invalid comment ID",
            "INVALID_COMMENT_ID",
            { commentId, message: "The provided comment ID is invalid." }
        )
    }

    static invalidCommentData(errors: Record<string, any>): createError.HttpError {
        return this.create(
            400,
            "Invalid comment data",
            "INVALID_COMMENT_DATA",
            { errors }
        )
    }

    static commentCreationFailed(): createError.HttpError {
        return this.create(
            500,
            "Failed to create comment",
            "CREATE_COMMENT_FAILED",
            { message: "An error occurred while creating the comment." }
        )
    }

    static updateCommentFailed(): createError.HttpError {
        return this.create(
            500,
            "Failed to update comment",
            "UPDATE_COMMENT_FAILED",
            { message: "An error occurred while updating the comment." }
        )
    }

    static deleteCommentFailed(): createError.HttpError {
        return this.create(
            500,
            "Failed to delete comment",
            "DELETE_COMMENT_FAILED",
            { message: "An error occurred while deleting the comment." }
        )
    }

    static unauthorizedCommentAccess(): createError.HttpError {
        return this.create(
            403,
            "Unauthorized comment access",
            "UNAUTHORIZED_COMMENT_ACCESS",
            { message: "You are not authorized to perform this action on this comment." }
        )
    }
}