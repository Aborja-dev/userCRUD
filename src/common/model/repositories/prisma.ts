import { UserModelObject } from '@/common/model/types';
import { ForRegisterUserController, UserObject } from '@/server/User_managment/types/user';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const roles = {
    "ADMIN": 1,
    "USER": 2
}

const userFromModel = (user: UserModelObject): UserObject => {
    return {
        avatarURL: user.avatarURL || "",
        email: user.email,
        id: user.id,
        isAdmin: user.roleId === 1,
        name: user.name || "",
        password: user.password,
        phone: user.phone,
        role: Object.entries(roles).find(([, value]) => value === user.roleId)?.[0] as 'MODERADOR' | 'VIP' | 'SELLER' | 'CLIENT' | 'ADMIN',
        state: user.active as "ACTIVE" | "INACTIVE" | "SUSPENDED",
    }
}

export const insertUser = async (input: ForRegisterUserController) => {
    const { email, name, password, adress, avatarURL } = input
    const newUser: Omit<UserModelObject, 'id'| 'role'> = {
        avatarURL: avatarURL || "",
        email,
        name,
        password,
        phone: "",
        roleId: roles.USER,
        active: "ACTIVE",
        adress: adress || null
    }
    try {
        await prisma.user.create({ data: newUser})
    } catch (error) {
        throw error
    }
}
export const updateUser = async (id: UserObject['id'], data: Partial<UserObject>) => {
    const {role, ...userInput} = data
    try {
        await prisma.user.update({ where: { id }, data: userInput })
    } catch (error) {
        throw error
    }
}
export const selectAllUser = async (): Promise<UserObject[]> => {
    try {
        const users = await prisma.user.findMany()
        return users.map(userFromModel)
    } catch (error) {
        throw error
    }
}
export const selectUser = async <V>(search: keyof UserObject, value: V) => {
    try {
        const user = await prisma.user.findFirst({ where: { [search]: value as string } })
        return !user ? null : userFromModel(user)
    } catch (error) {
        throw error
    }
    
}
export const deletetUser = async (id: UserObject['id']) => {
    try {
        await prisma.user.delete({ where: { id } })
    } catch (error) {
        throw error
    }
}