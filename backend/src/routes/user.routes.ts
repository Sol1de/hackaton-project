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

userRouter.get('/:id', (req, res) => {
    res.send('Route get user by id')
})

userRouter.post('/', (req, res) => {
    res.send('Route create user')
})

userRouter.post
('/:id', (req, res) => {
    res.send('Route update user')
})

userRouter.post('/:id', (req, res) => {
    res.send('Route delete user')
})
