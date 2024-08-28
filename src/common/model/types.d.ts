export interface UserModelObject {
    id: number;
    email: string;
    name: string | null;
    password: string;
    phone: string | null;
    adress: string | null;
    avatarURL: string | null;
    roleId: number;
    active: string;
}


export interface ForInsertUserModel {
    email: string
    name: string
    password: string
    phone: string
    adress?: string
    avatarURL: string
}

export interface ForUpdateUserModel {
    phone: string
    adress: string
    type: 'USER' | 'ADMIN'
    active: 'INACTIVE' | 'ACTIVE' | 'SUSPENDED'
    avatarURL: string
}