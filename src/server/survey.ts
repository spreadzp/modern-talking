'use server'
import { LotType, PrismaClient, Survey } from "@prisma/client";
const prisma = new PrismaClient()
export async function createSurvey(surveyData: any, userId: number, greetingMessage: string): Promise<Survey> {

    const newSurvey = await prisma.survey.create({
        data: {
            ...surveyData,
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

    return newSurvey;
}

export async function getSurveys(): Promise<any[] | null> {
    const surveys = await prisma.survey.findMany({
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
    if (surveys.length === 0) {
        return null

    } else {
        return surveys?.map((survey: any) => {
            return {
                owner: survey.owner,
                hash: survey.hash,
                sourceUrl: survey.sourceUrl,
                title: survey.topic,
                description: survey.description,
                promptRestrictions: survey.prompt,
                rewards: survey.rewards,
                topic: survey.topic,
                chat: survey.chat,
                messages: survey.chat?.messages.length || 0,
                resourceType: LotType.Survey
            };
        });
    }
}

export async function getSurveyListByOwnerAddress(address: string): Promise<any[]> {
    const surveys = await prisma.survey.findMany({
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
    if (surveys.length === 0) {
        return surveys

    } else {
        return surveys?.map((survey: any) => {
            return {
                owner: survey.owner,
                hash: survey.hash,
                sourceUrl: survey.sourceUrl,
                title: survey.topic,
                description: survey.description,
                promptRestrictions: survey.prompt,
                nftId: survey.nftId,
                rewards: survey.rewards,
                topic: survey.topic,
                chat: survey.chat,
                messages: survey.chat?.messages.length || 0,
                resourceType: LotType.Survey
            };
        });
    }
}
export async function getSurveyByHash(hash: string): Promise<any | null> {
    const survey = await prisma.survey.findFirst({
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
    if (survey) {
        return {
            id: survey.id,
            owner: survey.owner,
            hash: survey.hash,
            sourceUrl: survey.sourceUrl,
            title: survey.topic,
            description: survey.description,
            promptRestrictions: survey.prompt,
            nftId: survey.nftId,
            rewards: survey.rewards,
            topic: survey.topic,
            chat: survey.chat,
            messages: survey.chat?.messages.length || 0,
            resourceType: LotType.Survey
        };
    } else {
        return null
    }
}

export async function getCountSurveys(): Promise<number> {
    const count = await prisma.survey.count();
    return count;
}
