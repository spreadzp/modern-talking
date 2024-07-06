import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create Users
    const user1 = await prisma.user.create({
        data: {
            address: 'user1_address',
            email: 'user1@example.com',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            address: 'user2_address',
            email: 'user2@example.com',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            address: 'user3_address',
            email: 'user3@example.com',
        },
    });

    // Create Marketplace Items for User1
    const discussion = await prisma.marketplace.create({
        data: {
            ownerLot: user1.id,
            typeLot: 'Discussion',
            hashResource: 'discussion_hash',
            price: BigInt(100),
        },
    });

    const survey = await prisma.marketplace.create({
        data: {
            ownerLot: user1.id,
            typeLot: 'Survey',
            hashResource: 'survey_hash',
            price: BigInt(200),
        },
    });

    const voting = await prisma.marketplace.create({
        data: {
            ownerLot: user1.id,
            typeLot: 'Voting',
            hashResource: 'voting_hash',
            price: BigInt(300),
        },
    });

    const dataset = await prisma.marketplace.create({
        data: {
            ownerLot: user1.id,
            typeLot: 'DataSet',
            hashResource: 'dataset_hash',
            price: BigInt(400),
        },
    });

    // Create Bids for User2 and User3
    await prisma.bid.createMany({
        data: [
            { bidOwner: user2.id, price: BigInt(110), status: 'Pending', idLot: discussion.id },
            { bidOwner: user2.id, price: BigInt(210), status: 'Pending', idLot: survey.id },
            { bidOwner: user2.id, price: BigInt(310), status: 'Pending', idLot: voting.id },
            { bidOwner: user2.id, price: BigInt(410), status: 'Pending', idLot: dataset.id },
            { bidOwner: user3.id, price: BigInt(120), status: 'Pending', idLot: discussion.id },
            { bidOwner: user3.id, price: BigInt(220), status: 'Pending', idLot: survey.id },
            { bidOwner: user3.id, price: BigInt(320), status: 'Pending', idLot: voting.id },
            { bidOwner: user3.id, price: BigInt(420), status: 'Pending', idLot: dataset.id },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });