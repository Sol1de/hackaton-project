import { Request, Response, NextFunction } from "express"
import createError from "http-errors"
import { z } from "zod"

export class ErrorMiddleware {
    public static handleError(
        error: Error,
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                code: "VALIDATION_ERROR",
                message: "Data validation error",
                errors: error.issues.map((err) => ({
                    path: err.path.join('.'),
                    message: err.message,
                })),
            })
            return
        }

        if (createError.isHttpError(error)) {
            const response: any = {
                success: false,
                code: (error as any).code || 'HTTP_ERROR',
                message: error.message,
            }

            const standardProps = ['name', 'message', 'stack', 'status', 'statusCode', 'expose']
            Object.keys(error).forEach(key => {
                if (!standardProps.includes(key) && key !== 'code') {
                    if (!response.details) {
                        response.details = {}
                    }
                    response.details[key] = (error as any)[key]
                }
            })

            res.status(error.statusCode).json(response)
            return
        }

        if ((error as any).code === 11000) {
            const field = Object.keys((error as any).keyPattern)[0]
            res.status(409).json({
                success: false,
                code: "DUPLICATE_FIELD",
                message: `A record with ${field} already exists`,
                details: { field },
            })
            return
        }

        console.error('Error not supported: ', error)
        res.status(500).json({
            success: false,
            code: "INTERNAL_SERVER_ERROR",
            message: process.env.NODE_ENV === 'development'
                ? error.message
                : "Internal error",
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        })
    }

    public static notFound(req: Request, res: Response): void {
        res.status(404).json({
            success: false,
            code: "ROUTE_NOT_FOUND",
            message: `Route ${req.originalUrl} not found`,
        })
    }
}