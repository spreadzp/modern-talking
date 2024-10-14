'use server'
import { LotType, PrismaClient, Voting } from "@prisma/client";
const prisma = new PrismaClient()
export async function createVoting(votingData: any, userId: number, greetingMessage: string): Promise<Voting> {


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


export async function getVotingListByOwnerAddress(address: string): Promise<any[]> {
    const votingList = await prisma.voting.findMany({
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
                nftId: voting.nftId,
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
    if (voting) {
        return {
            id: voting.id,
            owner: voting.owner,
            hash: voting.hash,
            sourceUrl: voting.sourceUrl,
            title: voting.topic,
            description: voting.description,
            promptRestrictions: voting.prompt,
            rewards: voting.rewards,
            nftId: voting.nftId,
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
