import {inject, injectable, singleton} from "tsyringe";
import { Request, Response, NextFunction } from "express";
import { registerUserSchema, RegisterUserInput } from "../schemas/user.schema";
import { z } from "zod";
import { User } from "../models/users.model";
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
        } catch (error) {
            // Gestion des erreurs de validation Zod
            /*if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Erreur de validation",
                    details: error.errors.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                });
                return;
            }

            // Autres erreurs
            res.status(500).json({
                message: "Une erreur est survenue lors de la création de l'utilisateur",
                details: error instanceof Error ? error.message : "Erreur inconnue",
            });*/
        }
    }
}