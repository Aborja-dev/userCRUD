import { hashPassword, signToken, verifyPassword } from "@/common/authManager/stub"
import { sendEmail } from "@/common/emailSender/stub"
import { deletetUser, insertUser, selectAllUser, selectUser, updateUser } from "@/common/model/repositories/stub"
import { Service } from "@/server/User_managment/service/Service";
import * as prismaRepo from "@/common/model/repositories/prisma";
const UserRepository = {
    insertUser,
    selectAllUser,
    selectUser,
    updateUser,
    deletetUser
}

const UserRepositoryPrisma = {
    ...prismaRepo
}

export type UserRepositoryType = typeof UserRepository;

const EmailSender = {
    sendEmail
}

export type EmailSenderType = typeof EmailSender

const AuthManager = {
    hashPassword,
    verifyPassword,
    signToken
}

export type AuthManagerType = typeof AuthManager

export const StubServiceComposition = new Service(UserRepository, EmailSender, AuthManager)
export const PrismaServiceComposition = new Service(UserRepositoryPrisma, EmailSender, AuthManager)