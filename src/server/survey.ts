'use server'
import { PrismaClient, Survey } from "@prisma/client";
const prisma = new PrismaClient()
export async function createSurvey(surveyData: Survey, userId: number, greetingMessage: string): Promise<Survey> {
    const rewardsData: any[] = [
        {
            description: 'First reward',
            condition: 'Complete the task',
            sum: 100,
        },
    ];

    const newSurvey = await prisma.survey.create({
        data: {
            ...surveyData,
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
    return newSurvey;
}

export async function getSurveys(): Promise<any[]> {
    const surveys = await prisma.survey.findMany({
        include: {
            chat: {
                include: {
                    messages: true,
                },
            },
            rewards: true,
        },
    });
    if (!surveys) {
        return []

    } else {
        return surveys?.map((survey: any) => {
            return {
                hash: survey.hash,
                sourceUrl: survey.sourceUrl,
                title: survey.topic,
                description: survey.description,
                promptRestrictions: survey.prompt,
                rewards: survey.rewards,
                topic: survey.topic,
                chat: survey.chat,
                messages: survey.chat?.messages.length || 0
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
            chat: {
                include: {
                    messages: true, 
                },
            },
            rewards: true,
        },
    });
    if(survey) {
        return {
            hash: survey.hash,
            sourceUrl: survey.sourceUrl,
            title: survey.topic, 
            description: survey.description,
            promptRestrictions: survey.prompt, 
            rewards: survey.rewards,
            topic: survey.topic,
            chat: survey.chat,
            messages: survey.chat?.messages.length || 0 
        };
    } else {
        return null
    }
}

export async function getCountSurveys(): Promise<number> {
    const count = await prisma.survey.count();
    return count;
}
