'use server'
import { PrismaClient, History } from "@prisma/client";
const prisma = new PrismaClient()

export async function createHistory(historyData: History, marketplaceId: number): Promise<History> {
    const newHistory = await prisma.history.create({
        data: {
            ...historyData,
            idLot: marketplaceId, // Ensure idLot is set correctly
        },
    });
    return newHistory;
}

export async function getHistoryList(): Promise<any[]> {
    const historyList = await prisma.history.findMany({
        include: {
            lot: true,
        },
    });
    return historyList;
}

export async function getHistoryById(id: number): Promise<any | null> {
    const history = await prisma.history.findUnique({
        where: {
            id: id,
        },
        include: {
            lot: true,
        },
    });
    return history;
}

export async function getCountHistory(): Promise<number> {
    const count = await prisma.history.count();
    return count;
}