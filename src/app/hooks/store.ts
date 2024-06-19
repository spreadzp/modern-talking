import { create } from "zustand";
import { DiscussionData } from "../interfaces/table.interfaces";
import { Message, User } from "@prisma/client";

interface MTSite {
    discussionsData: DiscussionData[];
    setDiscussionsData: (discussionsData: DiscussionData[]) => void;
    discussionData: DiscussionData;
    setDiscussionData: (discussionData: DiscussionData) => void;
    chatMessages: any[];
    setChatMessages: (chatMessages: any[]) => void;
    userAddressWallet: string;
    setUserAddressWallet: (userAddressWallet: string) => void;
    currentUser: User | null;
    setCurrentUser: (currentUser: User | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    countDiscussions: number;
    setCountDiscussions: (countDiscussions: number) => void;
}

export const useSiteStore = create<MTSite>((set) => ({
    discussionsData: [],
    setDiscussionsData: (discussionsData: DiscussionData[]) => set({ discussionsData }),
    discussionData: {} as DiscussionData,
    setDiscussionData: (discussionData: DiscussionData) => set({ discussionData }),
    chatMessages: [],
    setChatMessages: (chatMessages: any[]) => set({ chatMessages }),
    userAddressWallet: '',
    setUserAddressWallet: (userAddressWallet: string) => set({ userAddressWallet }),
    currentUser: null,
    setCurrentUser: (currentUser: User | null) => set({ currentUser }),
    messages: [],
    setMessages: (messages: Message[]) => set({ messages }),
    countDiscussions: 0,
    setCountDiscussions: (countDiscussions: number) => set({ countDiscussions }),
})
)