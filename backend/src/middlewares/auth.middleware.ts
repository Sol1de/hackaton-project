import { Request, Response, NextFunction } from "express"
import {TokenService} from "../services/token.service"
import {injectable} from "tsyringe"
import { TokenError } from "../errors/token.error"

@injectable()
export class AuthMiddleware {
    constructor(private tokenService: TokenService) {}

    public async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const token = this.tokenService.getToken(req)
            await this.tokenService.verifyToken(token)
            next()
        } catch (error) {
            next(error)
        }
    }
}