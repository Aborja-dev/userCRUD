import { AdminMiddleware } from '@/server/middleware/admin';
import { authMiddleware } from '@/server/middleware/auth';
import { Controller } from '@/server/User_managment/userController';
import express from 'express';


export const createUserRouter = () => {
    const router = express.Router()
    router.post('/register', Controller.register)
    router.post('/login', Controller.login)
    router.post('/recover', Controller.recover)
    router.get('/search', Controller.search)
    router.get('/detail/:id', Controller.detail)
    router.patch('/edit', Controller.edit)
    router.delete('/:id',Controller.destroy)
    router.get('/',authMiddleware, AdminMiddleware, Controller.getAll)
    return router
}