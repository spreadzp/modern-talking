'use server'
import { DiscussionData } from '@/app/interfaces/table.interfaces';
import { Chat, Discussion, PrismaClient, Reward, User } from '@prisma/client'
import { Wallet } from 'ethers';
// import { z } from 'zod'

// const schema = z.object({
//     email: z.string({
//         invalid_type_error: 'Invalid Email',
//     }),
// })

const prisma = new PrismaClient()

export async function getDiscussions(): Promise<DiscussionData[]> {
    const discussions = await prisma.discussion.findMany({
        include: {
            chat: {
                include: {
                    messages: true, // Include messages to count them later
                },
            },
            rewards: true,
        },
    });

    return discussions.map(discussion => {
        const chatMessages = discussion.chat?.messages.length || 0;

        return {
            hash: discussion.hash,
            sourceUrl: discussion.sourceUrl,
            title: discussion.prompt, // Assuming 'title' can be derived from 'prompt'
            description: discussion.description,
            promptRestrictions: discussion.prompt, // Assuming 'promptRestrictions' is the same as 'prompt'
            rewards: discussion.rewards,
            topic: discussion.topic,
            chatMessages: discussion.chat,
        };
    });
}

export async function getDiscussionByHash(hash: string): Promise<Discussion | null> {
    return prisma.discussion.findFirst({
        where: {
            hash: hash,
        },
    });
}

export async function getCountDiscussions(): Promise<number> {
    const count = await prisma.discussion.count();
    return count;
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