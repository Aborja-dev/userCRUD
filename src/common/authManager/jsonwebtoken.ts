import { TokenInfo } from "@/server/User_managment/types/user"
import jwt from 'jsonwebtoken'

export const verifyPassword = async (password: string) => true
export const hashPassword = async (password: string) => 'password' + password 
export const signToken = async (tokenInfo: TokenInfo) => jwt.sign(tokenInfo, process.env.SECRET || 'secret')
export const verifyToken = async (token: string): Promise<TokenInfo | null> => {
    try {
        const tokenInfo = jwt.verify(token, process.env.SECRET || 'secret')
        return tokenInfo as TokenInfo
    } catch (error) {
        return null
    }
    
}