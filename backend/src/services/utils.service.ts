import bcrypt from "bcrypt"

export class UtilsService {

    constructor() {}

    public hashPassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, 10)
    }

    public comparePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword)
    }
}