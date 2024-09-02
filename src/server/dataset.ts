'use server'
import { PrismaClient, DataSet, LotType } from "@prisma/client";
const prisma = new PrismaClient()
export async function createDataSet(dataSet: any, userId: number, greetingMessage: string, price: number): Promise<DataSet> {
    const rewardsData: any[] = [
        {
            description: 'First reward',
            condition: 'Complete the task',
            sum: 100,
        },
    ];

    const { hashLot, nftId, ...restData } = dataSet

    const newDataSet = await prisma.dataSet.create({
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
            typeLot: LotType.DataSet,
            hashResource: newDataSet.hash,
            hashLot,
            nftId,
            price: BigInt(price),
        },
    });
    return newDataSet;
}

export async function getDataSets(): Promise<any[]> {
    const dataSets = await prisma.dataSet.findMany({
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
    if (dataSets.length === 0) {
        return dataSets

    } else {
        return dataSets?.map((dataSet: any) => {
            return {
                owner: dataSet.owner,
                hash: dataSet.hash,
                sourceUrl: dataSet.sourceUrl,
                title: dataSet.topic,
                description: dataSet.description,
                promptRestrictions: dataSet.prompt,
                rewards: dataSet.rewards,
                topic: dataSet.topic,
                chat: dataSet.chat,
                messages: dataSet.chat?.messages.length || 0,
                resourceType: LotType.DataSet
            };
        });
    }
}

export async function getDataSetListByOwnerAddress(address: string): Promise<any[]> {
    const dataSets = await prisma.dataSet.findMany({
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
    if (dataSets.length === 0) {
        return dataSets

    } else {
        return dataSets?.map((dataSet: any) => {
            return {
                owner: dataSet.owner,
                hash: dataSet.hash,
                sourceUrl: dataSet.sourceUrl,
                title: dataSet.topic,
                description: dataSet.description,
                promptRestrictions: dataSet.prompt,
                rewards: dataSet.rewards,
                topic: dataSet.topic,
                chat: dataSet.chat,
                messages: dataSet.chat?.messages.length || 0,
                resourceType: LotType.DataSet
            };
        });
    }
}

export async function getDataSetByHash(hash: string): Promise<any | null> {
    const dataSet = await prisma.dataSet.findFirst({
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
    if (dataSet) {
        return {
            owner: dataSet.owner,
            hash: dataSet.hash,
            sourceUrl: dataSet.sourceUrl,
            title: dataSet.topic,
            description: dataSet.description,
            promptRestrictions: dataSet.prompt,
            rewards: dataSet.rewards,
            topic: dataSet.topic,
            chat: dataSet.chat,
            messages: dataSet.chat?.messages.length || 0,
            resourceType: LotType.DataSet
        };
    } else {
        return null
    }
}

export async function getCountDataSets(): Promise<number> {
    const count = await prisma.dataSet.count();
    return count;
}
