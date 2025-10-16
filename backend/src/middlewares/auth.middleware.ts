import { Request, Response, NextFunction } from "express"
import {TokenService} from "../services/token.service"
import {injectable} from "tsyringe"
import { TokenError } from "../errors/token.error"

@injectable()
export class AuthMiddleware {
    constructor(private tokenService: TokenService) {}

    public async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers['authorization']

            if (!token) {
                throw TokenError.missingToken()
            }

            if (token.startsWith('Bearer ')) {
                token = token.substring(7)
            }

            await this.tokenService.verifyToken(token)
            next()
        } catch (error) {
            next(error)
        }
    }
}