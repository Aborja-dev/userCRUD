import express from "express";
import cors from "cors"
import { createUserRouter } from "@/server/User_managment/userRouter";
import { authMiddleware } from "@/server/middleware/auth";

const userRouter = createUserRouter()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/users', userRouter)

export const App = async () => {
    return app
}