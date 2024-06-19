import { create } from 'zustand';
import { createAccountFromMnemonic, createHashForPrivateKeyFromString } from '@/app/hooks/utils'
import { prisma } from '@/lib/prisma'
import { session } from '@/lib/session'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'



const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async signIn({  }) {
            return true
        },
        session,
        async jwt({ token}) {
            if (token) {
                const identity = `${token?.sub}:${'salt'}`
                const wallet = createHashForPrivateKeyFromString(identity) 
                if(wallet){
                    const account = createAccountFromMnemonic(wallet?._mnemonic().phrase)

                    const sk = account._signingKey()
                    const user = await prisma.user.findFirst({
                        where: {
                            email: token.email,
                        },
                    })
                    if (!user) {
                        await prisma.user.create({
                            data: {
                                address: account.address,
                                email: token.email,
                            }})
    
                    }
                } 
            }
            return token
        }  
    }

}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }