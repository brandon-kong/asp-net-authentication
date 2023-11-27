import NextAuth, { Account, NextAuthOptions, Session, User }  from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

const handler : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "email-password",
            name: "email-password",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                const res = await fetch("http://localhost:5058/api/v1/auth/login", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })

                const user = await res.json() as User
                user.email = credentials && credentials.email

                if (res.ok && user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],

    pages: {
        signIn: "/login",
        newUser: "/register"
    },

    callbacks: {
        async jwt({token, user, account}: {
            token: JWT, account: Account | null, user: User
        }) {

            if (user) {
                token.accessToken = user.accessToken
                token.refreshToken = user.refreshToken

                const expiresIn = user.expiresIn
                
                if (expiresIn) {
                    token.exp = Date.now() + expiresIn * 1000
                }
                else {
                    token.exp = Date.now() + 60 * 60
                }
            }

            // Refresh if token has expired

            if (Date.now() < token.exp * 1000) {
                return token
            }

            const res = await fetch("http://localhost:5058/api/v1/auth/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: token.refreshToken })
            })

            const data = await res.json()
            const newToken = data.accessToken

            token.accessToken = newToken
            token.refreshToken = data.refreshToken

            return token
        },
        async session({
            session, token, user
        }: {
            session: Session, token: JWT, user: User
        
        }) {
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken

            if (user) {
                session.user = user
            }

            console.log(user)

            return session
        }
    },
}

export default handler;