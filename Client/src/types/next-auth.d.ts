import NextAuth, { Account, DefaultSession, User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        accessToken?: Account.accessToken
        refreshToken?: Account.refreshToken
        user: {
            accessToken?: Account.accessToken
            refreshToken?: Account.refreshToken
        } & DefaultSession['user']
    }
}

declare module "next-auth" {
    interface User {
        accessToken?: Account.accessToken,
        refreshToken?: Account.refreshToken,
        expiresIn?: number
        tokenType?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: Account.accessToken,
        refreshToken?: Account.refreshToken,
        exp: number
    }
}