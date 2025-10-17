import {Router} from 'express'
import {container} from 'tsyringe'
import {PostController} from '../controllers/post.controller'
import {AuthMiddleware} from '../middlewares/auth.middleware'

const postController = container.resolve(PostController)
const authMiddleware = container.resolve(AuthMiddleware)

export const postRouter = Router()

postRouter.get('/', postController.getPosts.bind(postController))

postRouter.get('/:postId', postController.getPost.bind(postController))

postRouter.post('/',
    authMiddleware.authenticate.bind(authMiddleware),
    postController.createPost.bind(postController)
)

postRouter.put('/:postId',
    authMiddleware.authenticate.bind(authMiddleware),
    postController.updatePost.bind(postController)
)

postRouter.delete('/:postId',
    authMiddleware.authenticate.bind(authMiddleware),
    postController.deletePost.bind(postController)
)