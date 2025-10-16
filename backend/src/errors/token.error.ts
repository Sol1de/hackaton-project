//include import here
import createError from "http-errors";

export class TokenError extends Error {
    private _message: string;

    constructor(message: string) {
        super(message);
        this._message = message;
    }

    get message(): string {
        return this._message;
    }
    set message(message: string) {
        this._message = message;
    }

    static invalidToken(token: string): createError.HttpError {
        return createError(401, 'Invalid token', {
            code: 'INVALID_TOKEN',
            token,
            count: Object.keys(token).length
        });
    }
}