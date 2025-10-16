import {Router} from 'express'
import {container} from 'tsyringe'
import {PostController} from '../controllers/post.controller'
import {AuthMiddleware} from '../middlewares/auth.middleware'
import { userRouter } from './user.routes'

const postController = container.resolve(PostController)
const authMiddleware = container.resolve(AuthMiddleware)

export const postRouter = Router()

postRouter.post('/', postController.createPost.bind(postController))

postRouter.get('/', postController.getPosts.bind(postController))

postRouter.get('/:id', (req, res) => {
    res.send('Route get post by id')
})

postRouter.put('/:id', postController.updatePost.bind(postController))

postRouter.delete('/:id', postController.deletePost.bind(postController))