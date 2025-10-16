import createError from "http-errors";

export class BaseError {
    protected static create(
        statusCode: number,
        message: string,
        code: string,
        details?: Record<string, any>
    ): createError.HttpError {
        return createError(statusCode, message, {
            code,
            ...details,
        });
    }
}
