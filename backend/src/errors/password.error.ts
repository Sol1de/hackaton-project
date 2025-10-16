//import {password} from
import createError from "http-errors";
export class PasswordError extends Error {
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

    static passwordTooShort(password: string): createError.HttpError {
        return createError(411, 'Password too short', {
            code: 'PASSWORD_TOO_SHORT',
            password,
            count: Object.keys(password).length
        })
    }
}