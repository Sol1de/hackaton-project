import { injectable } from "tsyringe"
import { Request, Response, NextFunction } from "express"
import { registerUserSchema, RegisterUserInput, LoginUserInput, loginUserSchema } from "../schemas/user.schema"
import { UserService } from "../services/user.service"
import {User} from "../models/users.model"
import {UserError} from "../errors/user.error"
import {UtilsService} from "../services/utils.service"

@injectable()
export class UserController {
    constructor(
        private userService: UserService,
        private utilsService: UtilsService
    ) {}

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: RegisterUserInput = registerUserSchema.parse(req.body)
            const existingUser = await User.findOne({ email: userData.email })

            if (existingUser) {
                throw UserError.userAlreadyExists(userData.email)
            }

            const user = await this.userService.createUser(userData)

            res.status(201).json({
                message: "User created",
                user: user,
            })
        } catch (error) {
            next(error)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: LoginUserInput = loginUserSchema.parse(req.body)
            const ipAdress = req.ip || req.socket.remoteAddress as string
            const userAgent = req.headers['user-agent'] as string
            const { user, token } = await this.userService.loginUser(userData, ipAdress, userAgent)

            res.status(200).json({
                message: "User logged in",
                user: user,
                token: token,
            })
        } catch (error) {
            next(error)
        }
    }
}