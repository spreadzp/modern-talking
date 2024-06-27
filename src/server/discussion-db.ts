'use server'
 
import { DiscussionData } from '@/app/interfaces/table.interfaces';
import {  Discussion, PrismaClient } from '@prisma/client' 
// import { z } from 'zod'

// const schema = z.object({
//     email: z.string({
//         invalid_type_error: 'Invalid Email',
//     }),
// })

const prisma = new PrismaClient()

export async function getDiscussions(): Promise<any[]> {
    const discussions = await prisma.discussion.findMany({
        include: {
            chat: {
                include: {
                    messages: true, 
                },
            },
            rewards: true,
        },
    });

    return discussions.map(discussion => { 

        return {
            hash: discussion.hash,
            sourceUrl: discussion.sourceUrl,
            title: discussion.topic, 
            description: discussion.description,
            promptRestrictions: discussion.prompt, 
            rewards: discussion.rewards,
            topic: discussion.topic,
            chat: discussion.chat,
            messages: discussion.chat?.messages.length || 0 
        };
    });
}

export async function getDiscussionByHash(hash: string): Promise<any | null> {
   const discussion = await prisma.discussion.findFirst({
        where: {
            hash: hash,
        },
        include: {
            chat: {
                include: {
                    messages: true, 
                },
            },
            rewards: true,
        },
    });
    if(discussion) {
        return {
            hash: discussion.hash,
            sourceUrl: discussion.sourceUrl,
            title: discussion.topic, 
            description: discussion.description,
            promptRestrictions: discussion.prompt, 
            rewards: discussion.rewards,
            topic: discussion.topic,
            chat: discussion.chat,
            messages: discussion.chat?.messages.length || 0 
        };
    } else {
        return null
    }
    
}

export async function getCountDiscussions(): Promise<number> {
    const count = await prisma.discussion.count();
    return count;
}

export async function createDiscussion(discussion: Discussion, userId: number, greetingMessage: string): Promise<Discussion> {
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
                create: rewardsData
            }
        },
    });
    return newDiscussion;
}