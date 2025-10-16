import createError from "http-errors";
export class EmailError extends Error {
  static invalidEmail(email: string): createError.HttpError {
    return createError(400, 'Invalid email', {
      code: 'INVALID_EMAIL',
      email,
    });
  }

  static emailAlreadyInUse(email: string): createError.HttpError {
    return createError(409, 'Email already in use', {
      code: 'EMAIL_ALREADY_IN_USE',
      email,
      suggestion: `Try another email address.`,
    });
  }
}