'use server'
import { PrismaClient, Marketplace, Bid, History } from "@prisma/client";
const prisma = new PrismaClient()

export async function createMarketplace(marketplaceData: Marketplace, userId: number): Promise<Marketplace> {
    const newMarketplace = await prisma.marketplace.create({
        data: {
            ...marketplaceData,
            ownerLot: userId, // Ensure ownerLot is set correctly
            // owner: {
            //     connect: {
            //         id: userId,
            //     },
            // },
        },
    });
    return newMarketplace;
}

export async function getMarketplaceByHash(hash: string): Promise<any | null> {
    const marketplace = await prisma.marketplace.findFirst({
        where: {
            hashResource: hash,
        },
        include: {
            bids: {
                include: {
                    owner: true, 
                },
            },
            history: true,
        },
    });
    return marketplace;
}
export async function getMarketplaceList(): Promise<any[]> {
    const marketplaceList = await prisma.marketplace.findMany({
        include: {
            bids: true,
            history: true,
        },
    });
    return marketplaceList;
}

export async function getMarketplaceById(id: number): Promise<any | null> {
    const marketplace = await prisma.marketplace.findUnique({
        where: {
            id: id,
        },
        include: {
            bids: true,
            history: true,
        },
    });
    return marketplace;
}

export async function getCountMarketplace(): Promise<number> {
    const count = await prisma.marketplace.count();
    return count;
}