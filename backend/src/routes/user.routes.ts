import { Router } from 'express'
import { container } from 'tsyringe'
import { UserController } from '../controllers/user.controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

const userController = container.resolve(UserController)
const authMiddleware = container.resolve(AuthMiddleware)

export const userRouter = Router()

userRouter.post('/register', userController.register.bind(userController))

userRouter.post('/login', userController.login.bind(userController))

userRouter.post('/logout',
    authMiddleware.authenticate.bind(authMiddleware),
    userController.logout.bind(userController))

userRouter.get('/', userController.getUsers.bind(userController))

userRouter.get('/:userId', userController.getUser.bind(userController))

userRouter.put
('/:userId', userController.updateUser.bind(userController))

userRouter.delete('/:userId', (req, res) => {
    res.send('Route delete user')
})
