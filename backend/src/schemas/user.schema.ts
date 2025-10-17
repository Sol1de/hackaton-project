import { z } from 'zod'

export const registerUserSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    firstname: z.string(),
    lastname: z.string(),
    avatar: z.string().optional(),
    description: z.string().optional(),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
})

export type LoginUserInput = z.infer<typeof loginUserSchema>

export const updateUserSchema = z.object({
    email: z.email({ message: "Invalid email address" }).optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    avatar: z.string().optional(),
    description: z.string().optional(),
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>

export const updatePasswordSchema = z.object({
    token: z
        .string()
        .min(1, { message: "Reset token is required" }),
    newPassword: z
        .string()
        .min(8, { message: "New password must be at least 8 characters long" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Password confirmation is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>
