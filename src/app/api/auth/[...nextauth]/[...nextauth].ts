import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

export const authOptions: NextAuthOptions = {
    providers: [GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    })],
    jwt: {
        async encode({ secret, token }) {
            console.log("🚀 ~ encode ~ token:", token)
            return jwt.sign(token as any, secret)
        },
        async decode({ secret, token }) {
            try {
                const decoded = jwt.verify(token as string, secret)
                return decoded as JwtPayload | null
            } catch (error) {
                console.error("JWT verification failed:", error)
                return null
            }
        },
    },
}

export default NextAuth(authOptions)