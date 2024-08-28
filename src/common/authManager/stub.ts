import { TokenInfo } from "@/server/User_managment/types/user"


export const verifyPassword = async (password: string) => true
export const hashPassword = async (password: string) => 'password' + password 
export const signToken = async (tokenInfo: TokenInfo) => 'token'
export const verifyToken = async (token: string): Promise<TokenInfo | null> => {
    try {
        const tokenInfo = {
            id: 1,
            role: 'CLIENT',
            loggedAt: new Date()
        }
        return tokenInfo as TokenInfo
    } catch (error) {
        return null
    }
    
}