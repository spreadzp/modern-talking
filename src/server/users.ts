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

export async function upsertUser(user: User): Promise<User> {
    const newUser = await prisma.user.upsert({

        where: {
            id: user.id
        },
        create: {
            ...{
                address: user.address,
                email: user.email
            }
        },
        update: {
            ...{
                address: user.address,
                email: user.email
            }
        },
    });
    return newUser;
}


export async function getUserByEmail(email: string): Promise<(User & { wallet: Wallet | null; }) | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            },
            include: {
                wallet: true
            },
        });
        if (!user) {
            return null
        }
        return user
    } catch (error) {
        return null
    }
}

export async function getUserByAddress(address: string): Promise<(User & { wallet: Wallet | null; }) | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                address
            },
            include: {
                wallet: true
            },
        });
        if (!user) {
            return null
        }
        return user
    } catch (error) {
        return null
    }
}

export async function getUsersAddresses(ids: number[]): Promise<string[]> {
    try {
        const users = await prisma.user.findMany({
            where: {
                id: { in: ids },
            },
            select: {
                address: true,
            },
        });

        if (!users || users.length === 0) {
            return [];
        }

        const addresses = users.map((user: { address: string }) => user.address);
        const uniqueAddresses = Array.from(new Set(addresses));

        return uniqueAddresses;
    } catch (error) {
        console.error('Error fetching user addresses:', error);
        return [];
    }
}