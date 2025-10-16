import { Request, Response, NextFunction } from "express"
import {UtilsService} from "../services/utils.service";
import {injectable} from "tsyringe";

@injectable()
export class AuthMiddleware {
    constructor(private utilsService: UtilsService) {}

    public authMiddleware(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']

        if (!token) {
            return res.status(403).json({ message: 'No token provided' })
        }

        this.utilsService.verifyToken(token)
        next()
    }
}