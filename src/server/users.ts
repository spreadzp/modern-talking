'use server'
import { PrismaClient, User, Wallet } from '@prisma/client' 
// import { z } from 'zod'

// const schema = z.object({
//     email: z.string({
//         invalid_type_error: 'Invalid Email',
//     }),
// })

const prisma = new PrismaClient()

export async function getUsers() {
    return prisma.user.findMany()


}
 export async function createUser(user: User): Promise<User> {

    const newUser = await prisma.user.create({
        data: {
            ...user
        },
    })
    return newUser
}

export async function getUserByEmail(email: string): Promise<(User & { wallet: Wallet | null;  })> {
    const user = await prisma.user.findFirst({
        where: {
            email
        },
        include: { 
            wallet: true
        },
    });
    if(!user) {
        throw new Error('User not found');
    }
    return user
}