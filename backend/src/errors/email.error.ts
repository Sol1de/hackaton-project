/*import {email} from*/
import createError from "http-errors";
export class EmailError extends Error {
    private _message: string;
    private _code: number | undefined;

  constructor(message: string, code?: number) {
    super(message);
    this._message = message;
    this._code = code;
  }

  get message() {
    return this._message;
  }
  set message(message: string) {
    this._message = message;
  }
  
  get code() {
    return this._code;
  }
  set code(code: number | undefined) {
    this._code = code;
  }

  static invalidEmail(email: string): createError.HttpError {
    return createError(422, 'Invalid email', {
      code: 'INVALID_EMAIL',
      email,
      count: Object.keys(email).length
    });
  }

  static emailAlreadyInUse(email: string): createError.HttpError {
    return createError(409, 'Email already in use', {
      code: 'EMAIL_ALREADY_IN_USE',
      email,
      count: Object.keys(email).length
    });
  }
}