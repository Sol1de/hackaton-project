import createError from "http-errors";
import { BaseError } from "./base.error";

export class UserError extends BaseError {
    static userNotFound(email: string): createError.HttpError {
        return this.create(
            404,
            "User not found",
            "USER_NOT_FOUND",
            { email }
        );
    }

    static invalidCredentials(): createError.HttpError {
        return this.create(
            401,
            "Invalid credentials",
            "INVALID_CREDENTIALS",
            { message: "Verify your credentials & try again." }
        );
    }

    static userAlreadyExists(email: string): createError.HttpError {
        return this.create(
            409,
            "User already exists",
            "USER_ALREADY_EXISTS",
        );
    }

    static invalidUserData(errors: Record<string, any>): createError.HttpError {
        return this.create(
            400,
            "Invalid User data",
            "INVALID_USER_DATA",
            { errors }
        );
    }
}
