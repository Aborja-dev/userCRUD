import { ForRegisterUserController, UserObject } from "@/server/User_managment/types/user"
const users: UserObject[] =  [
    {
        avatarURL: '',
        email: 'abraham@email.com',
        id: 1,
        isAdmin: true,
        name: '',
        password: '1234asdf',
        phone: '',
        role: 'USER' ,
        state: 'ACTIVE',
    }
]
export const insertUser = async (input: ForRegisterUserController) => {
    const {email,name, password, adress, avatarURL} = input
    users.push({
        avatarURL: avatarURL || '',
        email,
        id: 1,
        isAdmin: true,
        name,
        password,
        phone: '',
        role: 'USER',
        state: 'ACTIVE',
    })

}
export const updateUser = async (id: UserObject['id'], data: Partial<UserObject>) => {
    const userIndex = users.findIndex(user => user.id === id)
    users[userIndex] = {...users[userIndex], ...data}
}
export const selectAllUser = async (): Promise<UserObject[]> => {
    return users
}
export const selectUser = async <V>(search: keyof UserObject, value: V) => {
    return users.find(user => user[search] === value) ?? null
}
export const deletetUser = async (id: UserObject['id']) => {
    users.splice(users.findIndex(user => user.id === id), 1)
}