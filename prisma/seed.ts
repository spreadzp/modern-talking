import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create users
    const user1 = await prisma.user.create({
        data: {
            address: 'user1@example.com',

        },
    });

    const user2 = await prisma.user.create({
        data: {
            address: 'user2@example.com',

        },
    });

    const user3 = await prisma.user.create({
        data: {
            address: 'user3@example.com',

        },
    });


    // Create discussions
    const discussion1 = await prisma.discussion.create({
        data: {
            hash: 'hash1',
            sourceUrl: 'https://www.youtube.com/embed/U9qRD5MRzxY',
            description: 'Description for discussion 1',
            prompt: 'Prompt for discussion 1',
            topic: '[playlist] 뉴욕의 카페에서 재즈 음악을 즐기다, 책을 읽고 일하는 데 적합한 재즈 음악 | Cafe JAZZ',
            chat: {
                create: {
                    messages: {
                        create: {
                            message: 'Hello, this is a message from user 1',
                            user: {
                                connect: {
                                    id: user1.id,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    // const discussion2 = await prisma.discussion.create({
    //     data: {
    //         hash: 'hash2',
    //         sourceUrl: 'https://www.google.com/finance/quote/AMZN:NASDAQ?hl=en',
    //         description: 'Description for discussion 2',
    //         prompt: 'Prompt for discussion 2',
    //         topic: 'Topic for discussion 2',
    //         chat: {
    //             create: {
    //                 messages: {
    //                     create: {
    //                         message: 'Hello, this is a message from user 2',
    //                         user: {
    //                             connect: {
    //                                 id: user2.id,
    //                             },
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // });

    // const discussion3 = await prisma.discussion.create({
    //     data: {
    //         hash: 'hash3',
    //         sourceUrl: 'https://www.youtube.com/embed/G5q_F3yXvJk',
    //         description: 'Description for discussion 3',
    //         prompt: 'Prompt for discussion 3',
    //         topic: 'The 3rd dimension - reality of time.',
    //         chat: {
    //             create: {
    //                 messages: {
    //                     create: {
    //                         message: 'Hello, this is a message from user 3',
    //                         user: {
    //                             connect: {
    //                                 id: user3.id,
    //                             },
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     },
    // });
    console.log({ user1, user2, user3, discussion1});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });