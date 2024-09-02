'use server'
import { PrismaClient, Reward } from "@prisma/client";
const prisma = new PrismaClient()

// Create a new reward
export async function createReward(rewardData: any): Promise<Reward> {
    const newReward = await prisma.reward.create({
        data: {
            ...rewardData,
        },
    });
    return newReward;
}

export async function createRewardByResource(rewardData: any, contentData: any): Promise<Reward> {
    const resourceName = contentData.resourceType.toLowerCase();
    const resourceIdField = `${resourceName}Id`;

    // Create a new Reward
    const newReward = await prisma.reward.create({
        data: {
            ...rewardData,
            [resourceIdField]: contentData.id,
        },
    });

    return newReward;
}
// Get all rewards
export async function getRewards(): Promise<Reward[]> {
    const rewards = await prisma.reward.findMany({
        include: {
            survey: true,
            voting: true,
            dataset: true,
            discussion: true,
            token: true,
        },
    });
    return rewards;
}

export async function getRewardsByContent(contentData: any): Promise<Reward[]> {
    const resourceName = contentData.resourceType.toLowerCase()
    const includeData = {
        [`${resourceName}`]: true
    }

    const rewards = await prisma.reward.findMany({
        where: {
            [`${resourceName}Id`]: contentData.id
        },
        include: {
            ...includeData
        },
    });

    return rewards;
}

// Get a reward by ID
export async function getRewardById(id: number): Promise<Reward | null> {
    const reward = await prisma.reward.findUnique({
        where: {
            id: id,
        },
        include: {
            survey: true,
            voting: true,
            dataset: true,
            discussion: true,
            token: true,
        },
    });
    return reward;
}

export async function countRewardsByResource(): Promise<{
    survey: number,
    voting: number,
    dataset: number,
    discussion: number,
}> {
    const result = await prisma.reward.groupBy({
        by: ['surveyId', 'votingId', 'datasetId', 'discussionId'],
        _sum: {
            sum: true,
        },
        where: {
            OR: [
                { surveyId: { not: null } },
                { votingId: { not: null } },
                { datasetId: { not: null } },
                { discussionId: { not: null } },
            ],
        },
    });

    // Initialize sums with zero
    let surveySum = 0;
    let votingSum = 0;
    let datasetSum = 0;
    let discussionSum = 0;

    // Summarize the results
    result.forEach(row => {
        if (row.surveyId !== null) surveySum += row._sum.sum || 0;
        if (row.votingId !== null) votingSum += row._sum.sum || 0;
        if (row.datasetId !== null) datasetSum += row._sum.sum || 0;
        if (row.discussionId !== null) discussionSum += row._sum.sum || 0;
    });

    return {
        survey: surveySum,
        voting: votingSum,
        dataset: datasetSum,
        discussion: discussionSum,
    };
}
// Get rewards by surveyId
export async function getRewardsBySurveyId(surveyId: number): Promise<Reward[]> {
    const rewards = await prisma.reward.findMany({
        where: {
            surveyId: surveyId,
        },
        include: {
            survey: true,
            voting: true,
            dataset: true,
            discussion: true,
            token: true,
        },
    });
    return rewards;
}

// Get rewards by votingId
export async function getRewardsByVotingId(votingId: number): Promise<Reward[]> {
    const rewards = await prisma.reward.findMany({
        where: {
            votingId: votingId,
        },
        include: {
            survey: true,
            voting: true,
            dataset: true,
            discussion: true,
            token: true,
        },
    });
    return rewards;
}

// Get rewards by datasetId
export async function getRewardsByDatasetId(datasetId: number): Promise<Reward[]> {
    const rewards = await prisma.reward.findMany({
        where: {
            datasetId: datasetId,
        },
        include: {
            survey: true,
            voting: true,
            dataset: true,
            discussion: true,
            token: true,
        },
    });
    return rewards;
}

// Get rewards by discussionId
export async function getRewardsByDiscussionId(discussionId: number): Promise<Reward[]> {
    const rewards = await prisma.reward.findMany({
        where: {
            discussionId: discussionId,
        },
        include: {
            survey: true,
            voting: true,
            dataset: true,
            discussion: true,
            token: true,
        },
    });
    return rewards;
}

// Update a reward by ID
export async function updateReward(id: number, rewardData: any): Promise<Reward> {
    const updatedReward = await prisma.reward.update({
        where: {
            id: id,
        },
        data: {
            ...rewardData,
        },
    });
    return updatedReward;
}

// Delete a reward by ID
export async function deleteReward(id: number): Promise<Reward> {
    const deletedReward = await prisma.reward.delete({
        where: {
            id: id,
        },
    });
    return deletedReward;
}

// Create a new reward by resource ID (surveyId | votingId | datasetId | discussionId)
export async function createNewRewardByResourceId(resourceId: number, resourceType: string, newRewardData: any): Promise<Reward> {
    const rewardData = {
        ...newRewardData,
    };

    switch (resourceType) {
        case 'survey':
            rewardData['surveyId'] = resourceId;
            break;
        case 'voting':
            rewardData['votingId'] = resourceId;
            break;
        case 'dataset':
            rewardData['datasetId'] = resourceId;
            break;
        case 'discussion':
            rewardData['discussionId'] = resourceId;
            break;
        default:
            throw new Error('Invalid resource type');
    }

    const newReward = await prisma.reward.create({
        data: rewardData,
    });
    return newReward;
}