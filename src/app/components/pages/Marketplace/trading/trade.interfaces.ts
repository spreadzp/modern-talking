import { Bid, User } from "@prisma/client";

export interface LotData {
    id: number;
    hashResource: string;
    price: number;
    sellerAddress: string;
    hashLot: string;
    bids: (Bid & { owner: User })[];
    historyTrades: HistoryTrade[];
}

export interface BidData {
    price: number;
    address: string;
}

export interface HistoryTrade {
    price: number;
    address: string;
    date: string;
}