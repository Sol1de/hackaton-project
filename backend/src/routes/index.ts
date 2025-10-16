import express, {Request, Response} from "express"
import { Router } from "express"
import { userRouter } from "./user.routes"

export const router = Router()

router.use('/users', userRouter)

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
