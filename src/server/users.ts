'use server'
import { PrismaClient, User } from '@prisma/client'
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
//     const validatedFields = schema.safeParse({
//         email: user.email,
//         name: user.name
//     }) 
//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//         }
//     }
    const newUser = await prisma.user.create({
        data: {
            ...user
        },
    })
    return newUser
}