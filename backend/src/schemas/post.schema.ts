import { z } from 'zod'

export const createPostSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required" })
        .max(200, { message: "Title must be at most 200 characters long" }),
    content: z
        .string()
        .min(1, { message: "Content is required" })
        .max(5000, { message: "Content must be at most 5000 characters long" }),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const updatePostSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title cannot be empty" })
        .max(200, { message: "Title must be at most 200 characters long" })
        .optional(),
    content: z
        .string()
        .min(1, { message: "Content cannot be empty" })
        .max(5000, { message: "Content must be at most 5000 characters long" })
        .optional(),
}).refine((data) => data.title !== undefined || data.content !== undefined, {
    message: "At least one field (title or content) must be provided",
})

export type UpdatePostInput = z.infer<typeof updatePostSchema>
