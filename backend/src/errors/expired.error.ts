//import {ExpiredError} from
import createError from "http-errors";
export class ExpiredError extends Error {
    private _message: string;

    constructor(message: string) {
        super(message);
        this._message = message;
    }

    get message() {
        return this._message;
    }
    set message(message: string) {
        this._message = message;
    }

    static invalidSession(message: string): createError.HttpError {
        return createError(400, 'Session expired', {
            code: 'INVALID_SESSION',
            message,
            count: Object.keys(message).length
        });
    }
}