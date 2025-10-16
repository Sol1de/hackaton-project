import createError from "http-errors"
import { BaseError } from "./base.error"

export class TokenError extends BaseError {
    static invalidToken(): createError.HttpError {
        return this.create(
            401,
            "Invalid token",
            "INVALID_TOKEN",
            { message: "Invalid provided token" }
        )
    }

    static expiredToken(): createError.HttpError {
        return this.create(
            401,
            "Token expired",
            "EXPIRED_TOKEN",
            { message: "Your session has expired. Please log in again." }
        )
    }

    static missingToken(): createError.HttpError {
        return this.create(
            403,
            "Missing token",
            "MISSING_TOKEN",
            { message: "No token provided." }
        )
    }

    static tokenNotFound(): createError.HttpError {
        return this.create(
            404,
            'Token invalid or not found',
            'TOKEN_NOT_FOUND'
        )
    }

    static cleanTokensFailed(): createError.HttpError {
        return this.create(
            500,
            'Failed to clean expired tokens',
            'CLEAN_TOKENS_FAILED'
        )
    }
}