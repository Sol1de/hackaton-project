//include import here
import createError from "http-errors";

export class TokenError extends Error {
    static invalidToken(token: string): createError.HttpError {
        return createError(401, 'Invalid token', {
            code: 'INVALID_TOKEN',
            token,
            count: Object.keys(token).length
        });
    }
}