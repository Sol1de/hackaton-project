import { Router } from 'express';

export const userRouter = Router();

userRouter.post('/register', (req, res) => {
    res.send('Route register');
});

userRouter.post('/login', (req, res) => {
    res.send('Route login');
});

userRouter.get('/', (req, res) => {
    res.send('Route get all users');
});

userRouter.get('/:id', (req, res) => {
    res.send('Route get user by id');
});

userRouter.post('/', (req, res) => {
    res.send('Route create user');
});

userRouter.post
('/:id', (req, res) => {
    res.send('Route update user');
});

userRouter.post('/:id', (req, res) => {
    res.send('Route delete user');
});