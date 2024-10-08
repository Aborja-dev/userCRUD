import { PrismaServiceComposition,  } from "@/server/User_managment/service/index"
import { CustomError } from "@/server/User_managment/service/Service"
import { UserRole } from "@/server/User_managment/types/const";
import { ForRegisterUserController, ForLoginUserController, ForSearchQueryUsersController, ForEditUserController, UserObject, Sesion, ControllerError } from "@/server/User_managment/types/user"
import { Request, Response } from "express"


import pc from "picocolors";
export const service = PrismaServiceComposition
export class Controller {
    static register = async (req: Request<{}, {}, ForRegisterUserController>, res: Response) => {
        const { email, name, password, phone, adress } = req.body
        try {
            await service.registerUser({ email, name, password, phone, adress, avatarFile: req.file })
            return res.status(201).json({ message: 'register end point' })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }
    static login = async (req: Request<{}, {}, ForLoginUserController>, res: Response<Sesion | ControllerError>) => {
        const { email, password } = req.body
        try {
            const result = await service.loginUser({ email, password })
            return res.status(200).json(result)
        } catch (error: unknown) {
            const {message, code, where} = error as CustomError
            console.log(pc.red(`error ${where} ${message}`));
            return res.status(404).json({message, code})
        }   
    }
    static recover = async (req: Request<{}, {}, { email: string }>, res: Response) => {
        const { email } = req.body
        service.recoverUser({ email })
        return res.status(200).send('recover endpoint')
    }
    static search = async (req: Request<{}, {}, {value: any}, ForSearchQueryUsersController>, res: Response) => {
        const query = req.query.search
        const value = req.body.value
        if (query === 'email' || query === 'name') {
            const userFinded = await service.searchUser(query, value)
            return res.status(200).json(userFinded)
        }
        const userFinded = await service.searchUser('id', value)
        return res.status(200).json(userFinded)
    }
    static detail = async (req: Request<{ id: string }>, res: Response) => {
        const id = +req.params.id
        return res.status(200).send('user deetail endpoint')
    }
    static edit = async (req: Request<{}, {}, Partial<ForEditUserController>[]>, res: Response) => {
        const infoToUpdate = req.body.map((user) => ({ 
            id: user.id as number,
            data: {
                role: user.role as UserObject['role'],
                state: user.active as UserObject['state']
            }
         }))
        service.editUserState(infoToUpdate)   
        return res.status(200).send('edit endpoint')
    }

    static updateOne = async (req: Request<{ id: number }, {}, Partial<ForEditUserController>>, res: Response) => {
        const id = +req.params.id
        const {role, active} = req.body
        const data = {
            role: role as UserRole,
            state: active
        }
        try {
            service.editOneUser(id, data)
            return res.status(200).json({message: 'user updated'})
        } catch (error) {
            return res.status(400).json({error})
        }
    }

    static destroy = async (req: Request<{ id: number }>, res: Response) => {
        const id = +req.params.id
        try {
            await service.deleteUser(id)
            return res.status(200).json({message: 'user deleted'})
        }
        catch (error) {
            return res.status(400).json({error})
        }
    }
    static getAll = async (req: Request, res: Response) => {
        const users = await service.getUsers()
        return res.status(200).json(users)
    }
}
