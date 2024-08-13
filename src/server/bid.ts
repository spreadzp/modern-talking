'use server' 
import { BidData } from "@/app/components/pages/Marketplace/trading/trade.interfaces";
import { PrismaClient, Bid, BidStatus, User } from "@prisma/client";
const prisma = new PrismaClient()

export async function createBid(bid: BidData, idLot: number): Promise<Bid & { owner: User } | null> {
    const user = await prisma.user.findUnique({
        where: {
            address: bid.address,
        },
    });
    if (!user) {
        throw new Error('User not found');
    }

    // Check if the idLot exists in the Marketplace table
    const marketplace = await prisma.marketplace.findUnique({
        where: {
            id: idLot,
        },
    });
    if (!marketplace) {
        throw new Error('Marketplace not found');
    }

    const newBid = await prisma.bid.create({
        data: {
            price: BigInt(bid.price),
            status: BidStatus.Pending,
            idLot,
            bidOwner: user.id,
        },
    });

    // Fetch the owner information
    if (newBid.bidOwner) {
        const owner = await prisma.user.findFirst({
            where: {
                id: newBid.bidOwner,
            },
        });

        if (!owner) {
            throw new Error('Owner not found');
        }

        return { ...newBid, owner };
    } else {
        return null;
    }
}

export async function updateBidPrice(id: number, price: number): Promise<Bid> {
    const bid = await prisma.bid.update({
        where: {
            id: id,
        },
        data: {
            price: BigInt(price),
        },
    });
    return bid;
}

export async function getBidList(): Promise<any[]> {
    const bidList = await prisma.bid.findMany({
        include: {
            owner: true,
            lot: true,
        },
    });
    return bidList;
}

export async function getBidById(id: number): Promise<any | null> {
    const bid = await prisma.bid.findUnique({
        where: {
            id: id,
        },
        include: {
            owner: true,
            lot: true,
        },
    });
    return bid;
}

export async function getCountBid(): Promise<number> {
    const count = await prisma.bid.count();
    return count;
}

export async function removeBidByOwnerId(id: number, idOwner: number): Promise<any> {
    // check if idOwner is the owner of the bid
    const bid = await prisma.bid.findUnique({
        where: {
            id: id,
            bidOwner: idOwner,
        },
    });
    if (!bid) {
        throw new Error('Bid not found');
    }
    
    return await prisma.bid.delete({
        where: {
            id: bid.id 
        }
    });
}