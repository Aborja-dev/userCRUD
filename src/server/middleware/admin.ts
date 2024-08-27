import { NextFunction, Request, Response } from "express"

export const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.app.locals.user
    if (role !== 'ADMIN') {
        return res.status(401).send({ error: 'Unauthorized' })
    }
    next()
}