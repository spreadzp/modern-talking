import { Chat, ListingStatus, Reward } from "@prisma/client";

export type Nft = {
    address?: string;
    nftId?: string;
    chainId?: string;
    link?: string | React.JSX.Element;
    title?: string;
    description?: string;
};

export type CoinData = {
    '#': number;
    hash: string;
    symbol?: string;
    name?: string;
    amount?: number;
};

export type TokenData = {
    '#': number;
    hash: string;
    contractAddress?: string;
    symbol?: string;
    name?: string;
    amount?: number;
};

export type NFTData = {
    '#': number;
    hash: string;
    name?: string;
    nftId?: string;
    symbol?: string;
    contractAddress?: string;
    uri?: string | React.JSX.Element;
    price?: number;
    seller?: string;
    buyer?: string;
    nftMetadata?: string;
};

export type SurveyData = {
    hash: string;
    sourceUrl: string;
    title: string;
    description: string;
    listingStatus: ListingStatus
    promptRestrictions: string;
    rewards?: Reward[];
    topic: string;
    chat?: Chat;
}

export type VotingData = {
    hash: string;
    sourceUrl: string;
    title: string;
    description: string;
    listingStatus: ListingStatus
    promptRestrictions: string;
    rewards?: Reward[];
    topic: string;
    chat?: Chat;
}

export type DataSetType = {
    hash: string;
    sourceUrl: string;
    title: string;
    description: string;
    listingStatus: ListingStatus
    promptRestrictions: string;
    rewards?: Reward[];
    topic: string;
    chat?: Chat;
}


export type DiscussionData = {
    hash: string;
    sourceUrl: string;
    title: string;
    description: string;
    listingStatus: ListingStatus
    promptRestrictions: string;
    rewards?: Reward[];
    topic: string;
    chat?: Chat;
}
export type StatisticTableData = {
    id: number;
    name: string;
    amount: number;
    rewardSumInUsd: number;
    routeName: string;
}

export type RewardTableData = Reward;
export type TableData = DiscussionData | StatisticTableData | SurveyData | VotingData;
export type ContentData = any | SurveyData;
