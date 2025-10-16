//import {password} from
import createError from "http-errors";
export class PasswordError extends Error {
    static passwordTooShort(password: string): createError.HttpError {
        return createError(411, 'Password too short', {
            code: 'PASSWORD_TOO_SHORT',
            password,
            count: Object.keys(password).length
        })
    }
}