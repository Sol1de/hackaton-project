//import {password} from

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
}