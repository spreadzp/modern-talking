'use server'
import { Chat, DataSet, Discussion, LotType, Message, PrismaClient, Survey, Voting } from '@prisma/client'
import { getDiscussionByHash } from './discussion-db'
import { getVotingByHash } from './voting'
import { getSurveyByHash } from './survey'
import { getDataSetByHash } from './dataset'


const prisma = new PrismaClient()

export async function getMessagesByChatId(chatId: number, address?: string, ownerAddress?: string): Promise<any> {
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
                id: item.id,
                position: item.user.address === address ? 'left' : 'right',
                date: new Date(),
                text: item.message,
                type: 'text',
                forwarded: false,
                replyButton: true,
                removeButton: address === ownerAddress ? true : false,
                title: item.user.address === address ? 'You' : item.user.address,
            }
            return message
        })
        return preparedData
    } else {
        return null
    }
}


export async function removeMessageById(id: number): Promise<any> {
    const message = await prisma.message.delete({
        where: {
            id: id
        }
    })
    return message
}


export async function createMessage(message: any, type: LotType): Promise<Message> {
    if (!message.message) {
        throw new Error('Message is required');
    }

    let chat: Chat | null = null;
    let entity: Discussion | Voting | Survey | DataSet | null = null;

    switch (type) {
        case LotType.Discussion:
            entity = await getDiscussionByHash(message.contentDataHash);
            if (!entity) {
                throw new Error('Discussion not found');
            }
            break;
        case LotType.Voting:
            entity = await getVotingByHash(message.contentDataHash);
            if (!entity) {
                throw new Error('Voting not found');
            }
            break;
        case LotType.Survey:
            entity = await getSurveyByHash(message.contentDataHash);
            if (!entity) {
                throw new Error('Survey not found');
            }
            break;
        case LotType.DataSet:
            entity = await getDataSetByHash(message.contentDataHash);
            if (!entity) {
                throw new Error('DataSet not found');
            }
            break;
        default:
            throw new Error('Invalid LotType');
    }

    if (!message.chatId) {
        chat = await prisma.chat.create({
            data: {
                [type.toLowerCase()]: {
                    connect: { id: entity.id }
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
