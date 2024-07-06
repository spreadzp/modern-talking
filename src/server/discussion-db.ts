'use server'

import { Discussion, LotType, PrismaClient } from '@prisma/client'
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
    if (discussions.length === 0) {
        return discussions

    } else {

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
    if (discussion) {
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

export async function createDiscussion(discussion: Discussion, userId: number, greetingMessage: string, price: number): Promise<Discussion> {
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

    await prisma.marketplace.create({
        data: {
            owner: {
                connect: {
                    id: userId,
                },
            },
            typeLot: LotType.Discussion,
            hashResource: newDiscussion.hash,
            price: BigInt(price),
        },
    });
    return newDiscussion;
}