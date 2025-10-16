import bcrypt from "bcrypt"
import crypto from "crypto"

export class UtilsService {

    constructor() {}

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