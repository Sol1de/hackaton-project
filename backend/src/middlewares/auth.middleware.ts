import { Request, Response, NextFunction } from "express"
import {TokenService} from "../services/token.service";
import {injectable} from "tsyringe";

@injectable()
export class AuthMiddleware {
    constructor(private tokenService: TokenService) {}

    public async authMiddleware(req: Request, res: Response, next: NextFunction) {
        let token = req.headers['authorization']

        if (!token) {
            return res.status(403).json({ message: 'No token provided' })
        }

        if (token.startsWith('Bearer ')) {
            token = token.substring(7)
        }

        await this.tokenService.verifyToken(token)
        next()
    }
}