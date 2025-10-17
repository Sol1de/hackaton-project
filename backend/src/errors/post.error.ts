import createError from "http-errors"
import { BaseError } from "./base.error"

export class PostError extends BaseError {
    static postNotFound(postId?: string): createError.HttpError {
        return this.create(
            404,
            "Post not found",
            "POST_NOT_FOUND",
            postId ? { postId, message: "The requested post does not exist." } : { message: "The requested post does not exist." }
        )
    }

    static invalidPostId(postId: string): createError.HttpError {
        return this.create(
            400,
            "Invalid post ID",
            "INVALID_POST_ID",
            { postId, message: "The provided post ID is not valid." }
        )
    }

    static invalidPostData(errors: Record<string, any>): createError.HttpError {
        return this.create(
            400,
            "Invalid post data",
            "INVALID_POST_DATA",
            { errors }
        )
    }

    static createPostFailed(): createError.HttpError {
        return this.create(
            500,
            "Failed to create post",
            "CREATE_POST_FAILED",
            { message: "An error occurred while creating the post." }
        )
    }

    static updatePostFailed(): createError.HttpError {
        return this.create(
            500,
            "Failed to update post",
            "UPDATE_POST_FAILED",
            { message: "An error occurred while updating the post." }
        )
    }

    static deletePostFailed(): createError.HttpError {
        return this.create(
            500,
            "Failed to delete post",
            "DELETE_POST_FAILED",
            { message: "An error occurred while deleting the post." }
        )
    }

    static unauthorizedPostAccess(): createError.HttpError {
        return this.create(
            403,
            "Unauthorized post access",
            "UNAUTHORIZED_POST_ACCESS",
            { message: "You are not authorized to perform this action on this post." }
        )
    }
}
