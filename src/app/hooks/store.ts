import { create } from "zustand";
import { DiscussionData } from "../interfaces/table.interfaces";
import { Message } from "@prisma/client";

interface MTSite {
    discussionsData: DiscussionData[];
    setDiscussionsData: (discussionsData: DiscussionData[]) => void;
    discussionData: DiscussionData;
    setDiscussionData: (discussionData: DiscussionData) => void;
    chatMessages: Partial<Message>[];
    setChatMessages: (chatMessages: Partial<Message>[]) => void;
}

export const useSiteStore = create<MTSite>((set) => ({
    discussionsData: [],
    setDiscussionsData: (discussionsData: DiscussionData[]) => set({ discussionsData }),
    discussionData: {} as DiscussionData,
    setDiscussionData: (discussionData: DiscussionData) => set({ discussionData }),
    chatMessages: [],
    setChatMessages: (chatMessages: Partial<Message>[]) => set({ chatMessages }),

})
)