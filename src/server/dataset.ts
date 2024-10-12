'use server'
import { PrismaClient, DataSet, LotType } from "@prisma/client";
const prisma = new PrismaClient()
export async function createDataSet(dataSet: any, userId: number, greetingMessage: string): Promise<DataSet> {

    const newDataSet = await prisma.dataSet.create({
        data: {
            ...dataSet,
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
            id: dataSet.id,
            owner: dataSet.owner,
            hash: dataSet.hash,
            sourceUrl: dataSet.sourceUrl,
            title: dataSet.topic,
            description: dataSet.description,
            promptRestrictions: dataSet.prompt,
            nftId: dataSet.nftId,
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
