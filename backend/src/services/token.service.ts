import { injectable } from "tsyringe"
import { Token } from "../models/tokens.model"
import mongoose from "mongoose"
import crypto from "crypto"
import { TokenPayloadInterface } from "../types/token.type"
import { UtilsService } from "./utils.service"
import { TokenError } from "../errors/token.error"
import { Request } from "express"

@injectable()
export class TokenService {
    private readonly SECRET_KEY: string
    private readonly TOKEN_EXPIRY_HOURS: number

    constructor(private utilsService: UtilsService) {
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

    public generateToken(userId: mongoose.Types.ObjectId, ipAdress: string, userAgent: string) {
        const expiresAt = new Date(Date.now() + (this.TOKEN_EXPIRY_HOURS * 60 * 60 * 1000))

        const payload: TokenPayloadInterface = {
            userId,
            expiresAt,
            ipAdress,
            userAgent
        }

        const payloadString = JSON.stringify(payload)
        const payloadBase64 = Buffer.from(payloadString).toString('base64url')
        const signature = this.generateSignature(payloadBase64)

        return `${payloadBase64}.${signature}`
    }

    public async verifyToken(tokenData: string) {
        const hashedToken = this.utilsService.hashToken(tokenData)
        const token = await Token.findOne({ token: hashedToken })

        if (!token) {
            throw TokenError.invalidToken()
        }

        if (new Date() > token.expiresAt) {
            await Token.deleteOne({ _id: token._id })
            throw TokenError.expiredToken()
        }

        return token
    }

    private generateSignature(data: string) {
        return crypto
            .createHmac('sha256', this.SECRET_KEY)
            .update(data)
            .digest('base64url')
    }

    public async cleanExpiredTokens() {
        try {
            const result = await Token.deleteMany({
                expiresAt: { $lt: new Date() }
            })

            console.log(`${result.deletedCount} deleted expired tokens`)
        } catch (error) {
            console.error('Error while cleaning tokens: ', error)
            throw TokenError.cleanTokensFailed()
        }
    }

    public getToken(req: Request): string {
        let token = req.headers['authorization']

        if (!token) {
            throw TokenError.missingToken()
        }

        if (token.startsWith('Bearer ')) {
            token = token.substring(7)
        }

        return token
    }
}
