import express, {Request, Response} from "express"
import { Router } from "express"
import { userRouter } from "./user.routes"
import { postRouter } from "./post.routes"

export const router = Router()

router.use('/users', userRouter)    
router.use('/posts', postRouter)

router.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Hello World !'
    })
})
