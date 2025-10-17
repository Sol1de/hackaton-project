import express, {Request, Response} from "express"
import { Router } from "express"
import { userRouter } from "./user.routes"
import { postRouter } from "./post.routes"
import { commentRouter } from "./comment.routes"

export const router = Router()

router.use('/users', userRouter)    
router.use('/posts', postRouter)
router.use('/comments', commentRouter)

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
