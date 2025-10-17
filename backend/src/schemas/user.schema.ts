import { z } from 'zod'

export const registerUserSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    firstname: z
        .string()
        .min(1, { message: "First name is required" })
        .max(50, { message: "First name must be at most 50 characters long" }),
    lastname: z
        .string()
        .min(1, { message: "Last name is required" })
        .max(50, { message: "Last name must be at most 50 characters long" }),
    avatar: z
        .url({ message: "Avatar must be a valid URL" })
        .optional(),
    description: z
        .string()
        .max(500, { message: "Description must be at most 500 characters long" })
        .optional(),
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
    firstname: z
        .string()
        .min(1, { message: "First name cannot be empty" })
        .max(50, { message: "First name must be at most 50 characters long" })
        .optional(),
    lastname: z
        .string()
        .min(1, { message: "Last name cannot be empty" })
        .max(50, { message: "Last name must be at most 50 characters long" })
        .optional(),
    avatar: z
        .url({ message: "Avatar must be a valid URL" })
        .optional(),
    description: z
        .string()
        .max(500, { message: "Description must be at most 500 characters long" })
        .optional(),
}).refine((data) => data.email !== undefined || data.firstname !== undefined || data.lastname !== undefined || data.avatar !== undefined || data.description !== undefined, {
    message: "At least one field (email, firstname, lastname, avatar, or description) must be provided",
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
