import bcrypt from "bcrypt"
import crypto from "crypto"
import mongoose from "mongoose"
import { ObjectIdError } from "../errors/objectId.error"

export class UtilsService {
    public validateObjectId(id: string): void {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw ObjectIdError.invalidObjectId(id)
        }
    }

    public hashPassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, 10)
    }

    public comparePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword)
    }

    public hashToken(token: string): string {
        return crypto
            .createHash('sha256')
            .update(token)
            .digest('hex')
    }
}