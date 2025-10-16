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
