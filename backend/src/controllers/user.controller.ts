import { Request, Response, NextFunction } from "express";
import { registerUserSchema, RegisterUserInput } from "../schemas/user.schema";
import { z } from "zod";
import { User } from "../models/users.model";

export class UserController {
    constructor() {}

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userData: RegisterUserInput = registerUserSchema.parse(req.body);

            const user = {
                email: userData.email,
                password: userData.password,
                firstname: userData.firstname,
                lastname: userData.lastname,
                avatar: userData.avatar,
                description: userData.description,
            };

            const createdUser = await User.create(user);

            res.status(201).json({
                message: "User created",
                user: createdUser,
            });
        } catch (error) {
            // Gestion des erreurs de validation Zod
            if (error instanceof z.ZodError) {
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
            });
        }
    }
}

// Instance singleton du contrôleur
export const userController = new UserController();