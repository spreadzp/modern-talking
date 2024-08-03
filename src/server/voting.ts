'use server'
import { LotType, PrismaClient, Voting } from "@prisma/client";
const prisma = new PrismaClient()
export async function createVoting(votingData: Voting, userId: number, greetingMessage: string, price: number): Promise<Voting> {
    const rewardsData: any[] = [
        {
            description: 'First reward',
            condition: 'Complete the task',
            sum: 100,
        },
    ];

    const newVoting = await prisma.voting.create({
        data: {
            ...votingData,
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
            typeLot: LotType.Voting,
            hashResource: newVoting.hash,
            price: BigInt(price),
        },
    });
    return newVoting;
}

export async function getVotingList(): Promise<any[]> { 
    const votingList = await prisma.voting.findMany({
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
    if (votingList.length === 0) {
        return votingList

    } else {
        return votingList?.map((voting: any) => {
            return {
                owner: voting.owner,
                hash: voting.hash,
                sourceUrl: voting.sourceUrl,
                title: voting.topic,
                description: voting.description,
                promptRestrictions: voting.prompt,
                rewards: voting.rewards,
                topic: voting.topic,
                chat: voting.chat,
                messages: voting.chat?.messages.length || 0,
                resourceType: LotType.Voting
            };
        });
    }
}

export async function getVotingByHash(hash: string): Promise<any | null> {
    const voting = await prisma.voting.findFirst({
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
    if(voting) {
        return {
            owner: voting.owner,
            hash: voting.hash,
            sourceUrl: voting.sourceUrl,
            title: voting.topic, 
            description: voting.description,
            promptRestrictions: voting.prompt, 
            rewards: voting.rewards,
            topic: voting.topic,
            chat: voting.chat,
            messages: voting.chat?.messages.length || 0,
            resourceType: LotType.Voting
        };
    } else {
        return null
    }
}

export async function getCountVoting(): Promise<number> {
    const count = await prisma.voting.count();
    return count;
}
