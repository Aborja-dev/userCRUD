import { verifyToken } from "@/common/authManager/stub"
import { verifyToken as verifyTokenJwt } from "@/common/authManager/jsonwebtoken"
import { NextFunction, Request, Response } from "express"

export const authMiddlewareStub = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = 'Bearer token'
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' })
    }
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({ error: 'No token provided' })
    }
    const tokenInfo = await verifyToken(token)
    if(tokenInfo) {
        req.app.locals.user = tokenInfo
        next()
    } else {
        return res.status(401).send({ error: 'Invalid token' })
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' })
    }
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({ error: 'No token provided' })
    }
    const tokenInfo = await verifyTokenJwt(token)
    if(tokenInfo) {
        req.app.locals.user = tokenInfo
        next()
    } else {
        return res.status(401).send({ error: 'Invalid token' })
    }
}