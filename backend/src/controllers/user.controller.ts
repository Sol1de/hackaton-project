import { injectable } from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { registerUserSchema, RegisterUserInput } from "../schemas/user.schema";
import { z } from "zod";
import { UserService } from "../services/user.service";

@injectable()
export class UserController {
    constructor(private userService: UserService) {}

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: RegisterUserInput = registerUserSchema.parse(req.body);
            const user = await this.userService.createUser(userData);

            res.status(201).json({
                message: "User created",
                user: user,
            });
        } catch (error: any) {
            throw new Error(`Error during user registration: ${error}`);
        }
    }
}