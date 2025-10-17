import createError from "http-errors"
import { BaseError } from "./base.error"

export class ObjectIdError extends BaseError {
    static invalidObjectId(objectId: string): createError.HttpError {
        return this.create(
            400,
            "Invalid Object ID",
            "INVALID_OBJECT_ID",
            {
                objectId,
                message: "The provided Object ID is not valid."
            }
        )
    }
}
