import { z } from 'zod'

export const createCommentSchema = z.object({
    content: z
        .string()
        .min(1, { message: "Content is required" })
        .max(2000, { message: "Content must be at most 2000 characters long" }),
    postId: z
        .string()
        .min(1, { message: "Post ID is required" }),
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>

export const updateCommentSchema = z.object({
    content: z
        .string()
        .min(1, { message: "Content cannot be empty" })
        .max(2000, { message: "Content must be at most 2000 characters long" }),
})

export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
