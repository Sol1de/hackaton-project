import { injectable } from "tsyringe"
import { Request, Response, NextFunction } from "express"
import { registerUserSchema, RegisterUserInput, LoginUserInput, loginUserSchema } from "../schemas/user.schema"
import { UserService } from "../services/user.service"

@injectable()
export class UserController {
    constructor(private userService: UserService) {}

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: RegisterUserInput = registerUserSchema.parse(req.body)
            const user = await this.userService.createUser(userData)

            res.status(201).json({
                message: "User created",
                user: user,
            });
        } catch (error: any) {
            throw new Error(`Error during user registration: ${error}`)
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: LoginUserInput = loginUserSchema.parse(req.body)
            const { user, token } = await this.userService.loginUser(userData)

            res.status(200).json({
                message: "User logged in",
                user: user,
                token: token,
            });
        } catch (error: any) {
            throw new Error(`Error during user login: ${error}`)
        }
    }
}