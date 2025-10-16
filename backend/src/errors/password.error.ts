import createError from "http-errors"
import { BaseError } from "./base.error"

export class PasswordError extends BaseError {
    static passwordTooShort(minLength: number): createError.HttpError {
        return this.create(
            400,
            "Password too short",
            "PASSWORD_TOO_SHORT",
            { 
                minLength,
                message: `Password must contain at least ${minLength} caractères.`
            }
        )
    }

    static invalidPassword(): createError.HttpError {
        return this.create(
            401,
            "Invalid password",
            "INVALID_PASSWORD"
        )
    }
}