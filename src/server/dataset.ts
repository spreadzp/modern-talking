'use server'
import { PrismaClient, DataSet } from "@prisma/client";
const prisma = new PrismaClient()
export async function createDataSet(dataSet: DataSet, userId: number, greetingMessage: string): Promise<DataSet> {
    const rewardsData: any[] = [
        {
            description: 'First reward',
            condition: 'Complete the task',
            sum: 100,
        },
    ];

    const newDataSet = await prisma.dataSet.create({
        data: {
            ...dataSet,
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
    return newDataSet;
}

export async function getDataSets(): Promise<any[]> {
    const dataSets = await prisma.dataSet.findMany({
        include: {
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
                hash: dataSet.hash,
                sourceUrl: dataSet.sourceUrl,
                title: dataSet.topic,
                description: dataSet.description,
                promptRestrictions: dataSet.prompt,
                rewards: dataSet.rewards,
                topic: dataSet.topic,
                chat: dataSet.chat,
                messages: dataSet.chat?.messages.length || 0
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
            chat: {
                include: {
                    messages: true, 
                },
            },
            rewards: true,
        },
    });
    if(dataSet) {
        return {
            hash: dataSet.hash,
            sourceUrl: dataSet.sourceUrl,
            title: dataSet.topic, 
            description: dataSet.description,
            promptRestrictions: dataSet.prompt, 
            rewards: dataSet.rewards,
            topic: dataSet.topic,
            chat: dataSet.chat,
            messages: dataSet.chat?.messages.length || 0 
        };
    } else {
        return null
    }
}

export async function getCountDataSets(): Promise<number> {
    const count = await prisma.dataSet.count();
    return count;
}
