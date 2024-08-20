'use server'

import { Discussion, LotType, PrismaClient } from '@prisma/client'
 

const prisma = new PrismaClient()

export async function getDiscussions(): Promise<any[]> {
    const discussions = await prisma.discussion.findMany({
        include: {
            owner: true,
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
                owner: discussion.owner, 
                hash: discussion.hash,
                sourceUrl: discussion.sourceUrl,
                title: discussion.topic,
                description: discussion.description,
                promptRestrictions: discussion.prompt,
                rewards: discussion.rewards,
                topic: discussion.topic,
                chat: discussion.chat,
                messages: discussion.chat?.messages.length || 0,
                resourceType: LotType.Discussion
            };
        });
    }
}

export async function getDiscussionListByOwnerAddress( address: string): Promise<any[]> {
    const discussions = await prisma.discussion.findMany({
        where: {
            owner: { 
                address, 
            }
        },
        include: {
            owner: true,
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
                owner: discussion.owner, 
                hash: discussion.hash,
                sourceUrl: discussion.sourceUrl,
                title: discussion.topic,
                description: discussion.description,
                promptRestrictions: discussion.prompt,
                rewards: discussion.rewards,
                topic: discussion.topic,
                chat: discussion.chat,
                messages: discussion.chat?.messages.length || 0,
                resourceType: LotType.Discussion    
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
            owner: true,
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
            id: discussion.id,
            owner: discussion.owner,
            hash: discussion.hash,
            sourceUrl: discussion.sourceUrl,
            title: discussion.topic,
            description: discussion.description,
            promptRestrictions: discussion.prompt,
            rewards: discussion.rewards,
            topic: discussion.topic,
            chat: discussion.chat,
            messages: discussion.chat?.messages.length || 0,
            resourceType: LotType.Discussion
        };
    } else {
        return null
    }

}

export async function getCountDiscussions(): Promise<number> {
    const count = await prisma.discussion.count();
    return count;
}

export async function createDiscussion(discussion: any, userId: number, greetingMessage: string, price: number): Promise<Discussion> {
    const rewardsData: any[] = [
        {
            description: 'First reward',
            condition: 'Complete the task',
            sum: 100,
        },
    ];
const {hashLot, nftId, ...restData} = discussion
    const newDiscussion = await prisma.discussion.create({
        data: {
            ...restData,
            owner: {
                connect: {
                    id: userId,
                },
            },
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
            nftId,
            hashLot,
            price: BigInt(price),
        },
    });
    return newDiscussion;
}