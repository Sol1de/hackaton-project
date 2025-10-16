import createError from "http-errors";
import { BaseError } from "./base.error";

export class EmailError extends BaseError {
    static invalidEmail(email: string): createError.HttpError {
        return this.create(
            400,
            "Invalid email format",
            "INVALID_EMAIL",
            { email }
        );
    }

    static emailAlreadyInUse(email: string): createError.HttpError {
        return this.create(
            409,
            "Email already in use",
            "EMAIL_ALREADY_IN_USE",
            { 
                email,
                message: "Try another email."
            }
        );
    }
}