'use server'
import { Chat,   Message, PrismaClient  } from '@prisma/client'
import { getDiscussionByHash } from './discussion-db'
// import { z } from 'zod'

// const schema = z.object({
//     email: z.string({
//         invalid_type_error: 'Invalid Email',
//     }),
// })

const prisma = new PrismaClient()

export async function getMessagesByChatId(chatId: number, address?: string): Promise<any> {
    const data = await prisma.chat.findFirst({
        where: {
            id: chatId
        },
        include: {
            messages: {
                include: {
                    user: true
                }
            }
        }
    })
    if (data && data?.messages?.length > 0) {
        const preparedData = data?.messages?.map((item: any) => {
            const message = {
                position: item.user.address === address ? 'left' : 'right',
                date: new Date(),
                text: item.message,
                type: 'text',
                forwarded: true,
                replyButton: true,
                removeButton: true,
                title: item.user.address === address ? 'You' : item.user.address,
            }
            return message
        })
        return preparedData
    } else {
        return null
    }
}


export async function createMessage(message: any): Promise<Message> {
    if (!message.message) {
        throw new Error('Message is required');
    }

    let chat: Chat | null = null;
    const discussion = await getDiscussionByHash(message.discussionHash)
    if (!discussion) {
        throw new Error('Discussion not found');
    }
    if (!message.chatId) {
        chat = await prisma.chat.create({
            data: {
                discussion: {
                    connect: { id: discussion.id }
                }
            }
        });
        message.chatId = chat.id;
    }

    const newMessage = await prisma.message.create({
        data: {
            message: message.message,
            userId: message.user.id,
            chatId: message.chatId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });

    return newMessage;
}
