/*import {email} from*/

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
}