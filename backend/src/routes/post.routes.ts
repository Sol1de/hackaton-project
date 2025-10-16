import {Router} from 'express'
import {container} from 'tsyringe'
import {PostController} from '../controllers/post.controller'
import {AuthMiddleware} from '../middlewares/auth.middleware'
import { userRouter } from './user.routes'

const postController = container.resolve(PostController)
const authMiddleware = container.resolve(AuthMiddleware)

export const postRouter = Router()

postRouter.post('/',
    authMiddleware.authenticate.bind(authMiddleware),
    postController.createPost.bind(postController))

postRouter.get('/', postController.getPosts.bind(postController))

postRouter.get('/:postId', postController.getPost.bind(postController))

postRouter.put('/:id', postController.updatePost.bind(postController))

postRouter.delete('/:id', postController.deletePost.bind(postController))