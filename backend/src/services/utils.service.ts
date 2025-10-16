import bcrypt from "bcrypt"
import crypto from "crypto"
import dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
    userId: string
    expiresAt: number
}

export class UtilsService {
    private readonly SECRET_KEY: string
    private readonly TOKEN_EXPIRY_HOURS: number

    constructor() {
        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET is not defined in environment variables")
        }
        if (!process.env.TOKEN_EXPIRY) {
            throw new Error("TOKEN_EXPIRY is not defined in environment variables")
        }

        this.SECRET_KEY = process.env.TOKEN_SECRET
        this.TOKEN_EXPIRY_HOURS = parseInt(process.env.TOKEN_EXPIRY, 10)

        if (isNaN(this.TOKEN_EXPIRY_HOURS)) {
            throw new Error("TOKEN_EXPIRY should be a valid number")
        }
    }

    public hashPassword(plainPassword: string) {
        return bcrypt.hash(plainPassword, 10)
    }

    public comparePassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword)
    }

    public generateToken(userId: string): string {
        const expiresAt = Date.now() + (this.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000)

        const payload: TokenPayload = {
            userId,
            expiresAt
        }

        const payloadString = JSON.stringify(payload)
        const payloadBase64 = Buffer.from(payloadString).toString('base64url')
        const signature = this.generateSignature(payloadBase64)

        return `${payloadBase64}.${signature}`
    }

    public verifyToken(token: string): TokenPayload {
        try {
            const [payloadBase64, signature] = token.split('.')

            if (!payloadBase64 || !signature) {
                throw new Error("invalid token format")
            }

            // Vérifier la signature
            const expectedSignature = this.generateSignature(payloadBase64)
            if (signature !== expectedSignature) {
                throw new Error("invalid token signature")
            }

            // Décoder le payload
            const payloadString = Buffer.from(payloadBase64, 'base64url').toString('utf-8')
            const payload: TokenPayload = JSON.parse(payloadString)

            // Vérifier l'expiration
            if (Date.now() > payload.expiresAt) {
                throw new Error("token expired")
            }

            return payload
        } catch (error: any) {
            throw new Error(`verification token error: ${error.message}`)
        }
    }

    private generateSignature(data: string): string {
        return crypto
            .createHmac('sha256', this.SECRET_KEY)
            .update(data)
            .digest('base64url')
    }
}