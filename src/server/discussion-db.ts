'use server'
import { Chat, Discussion, PrismaClient, Reward, User } from '@prisma/client'
// import { z } from 'zod'

// const schema = z.object({
//     email: z.string({
//         invalid_type_error: 'Invalid Email',
//     }),
// })

const prisma = new PrismaClient()

export async function getDiscussions(): Promise<(Discussion & { chat: Chat | null; rewards: Reward[] })[]> {
    return prisma.discussion.findMany({
        include: {
            chat: true,
            rewards: true,
        },
    });
}

export async function createDiscussion(discussion: Discussion, userId: number, greetingMessage: string): Promise<Discussion> {
    // Assuming you have some rewards data to associate with the discussion
    const rewardsData: any[] = [
        {
            description: 'First reward',
            condition: 'Complete the task',
            sum: 100,  
        }, 
    ];

    const newDiscussion = await prisma.discussion.create({
        data: {
            ...discussion,
            chat: {
                create: {
                    messages: {
                        create: {
                            message: greetingMessage,
                            user: {
                                connect: {
                                    id: userId,
                                },
                            },
                        },
                    },
                },
            },
            rewards: {
                create: rewardsData // Create rewards and associate them with the discussion
            }
        },
    });
    return newDiscussion;
}