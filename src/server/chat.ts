'use server'
import { Chat, Discussion, Message, PrismaClient, Reward, User } from '@prisma/client' 
// import { z } from 'zod'

// const schema = z.object({
//     email: z.string({
//         invalid_type_error: 'Invalid Email',
//     }),
// })

const prisma = new PrismaClient()

export async function getMessagesByChatId(chatId: number): Promise< (Chat& { messages: Message[] }) | null> {
    return prisma.chat.findFirst({
        where: {
            id: chatId
        },
        include: {
            messages: true
        }
    })
} 


export async function createMessage(message: Message): Promise<Message> { 
    if (!message.message) {
        throw new Error('Message is required');
    }

    const newMessage = await prisma.message.create({  
        data: {
            ...message
        }
    })
    return newMessage 
}
