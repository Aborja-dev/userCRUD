import { validateInputData } from "@/common/helpers"
import { AuthManagerType, EmailSenderType, UserRepositoryType } from "@/server/User_managment/service/index"
import { ForRegisterUserController, Sesion, UserObject } from "@/server/User_managment/types/user"

export class CustomError extends Error {
    constructor (message: string, public code: number, public where: string) {
        super(message)
    }
}

interface ForUserState {
    id: UserObject['id'],
    data: Partial<{
        state: UserObject['state']
        role: UserObject['role']
    }>
}

export class Service {
    constructor (
        private readonly userRepository: UserRepositoryType,
        private readonly emailSender: EmailSenderType,
        private readonly authManager: AuthManagerType
    ) {}
    registerUser = async (input: ForRegisterUserController) => {
        validateInputData(input)
        const hashedPassword = await this.authManager.hashPassword(input.password)
        this.userRepository.insertUser({
            ...input,
            password: hashedPassword
        })
        this.emailSender.sendEmail(input.email)
    }
    loginUser = async ({email, password}: {email: string, password: string}): Promise<Sesion> => {
        const user = await this.userRepository.selectUser('email', email)
        if (!user) throw new CustomError('user not found', 404, 'service loginUser') 
        this.authManager.verifyPassword(password)
        const token = await this.authManager.signToken({
            id: user?.id as number,
            loggedAt: new Date(Date.now()),
            role: user?.role
        })
        return {
            id: user?.id as number,
            role: user?.role,
            name: user?.name as string,
            avatarURL: user?.avatarURL as string,
            token
        }
    }
    deleteUser = async (id: number) => {
        this.userRepository.deletetUser(id)
    }
    editUserState = async (input: ForUserState[]) => {
        input.forEach(({id, data}) => {
            this.userRepository.updateUser(id, data)
        })
    }

    editOneUser = async (id: number, data: Partial<UserObject>) => {
        this.userRepository.updateUser(id, data)
    }

    getUsers = async (): Promise<UserObject[]> => {
        return this.userRepository.selectAllUser()
    }
    searchUser = async (searchWord: 'email' | 'name' | 'id', value: string): Promise<UserObject | null> => {
        const user = await this.userRepository.selectUser(searchWord, value)
        if (user === undefined) { return null }
        return user
    }
    recoverUser = async ({email}: {email: string}) => {
        this.userRepository.selectUser('email', email)
        this.emailSender.sendEmail(email)
    }
}