'use server'
import { BidData } from "@/app/components/pages/Marketplace/trading/TradingBoard";
import { PrismaClient, Bid, BidStatus, User } from "@prisma/client";
const prisma = new PrismaClient()

export async function createBid(bid: BidData, idLot: number): Promise<Bid & { owner: User }> {
    const user = await prisma.user.findUnique({
        where: {
            address: bid.address,
        },
    });
    if (!user) {
        throw new Error('User not found');
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
    const owner = await prisma.user.findUnique({
        where: {
            id: newBid.bidOwner,
        },
    });

    if (!owner) {
        throw new Error('Owner not found');
    }

    return { ...newBid, owner };
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