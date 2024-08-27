import { UserRole } from "./const"

export interface UserObject {
    id: number
    email: string
    name: string
    password: string
    phone: string
    adress?: string
    avatarURL: string
    isAdmin: boolean
    state: 'INACTIVE' | 'ACTIVE' | 'SUSPENDED'
    role: UserRole
}



interface Sesion {
    id: UserObject['id']
    role: UserObject['role']
    name: UserObject['name']
    avatarURL: UserObject['avatarURL'],
    token: string
}

interface ControllerError {
    message: string
    code: number
}

interface RequestLocals {
    user: TokenInfo
}

interface TokenInfo {
    id: UserObject['id']
    role: UserObject['role']
    loggedAt: Date
}

export interface ForRegisterUserController {
    email: string
    name: string
    password: string
    phone?: string
    adress?: string
    avatarURL?: string
}

export interface ForLoginUserController {
    email: string
    password: string
}

export interface ForSearchQueryUsersController {
    search?: string
}

export interface ForEditUserController {
    id: number
    role: string
    active: 'INACTIVE' | 'ACTIVE' | 'SUSPENDED'
}