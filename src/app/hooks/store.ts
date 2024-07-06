import { create } from "zustand";
import { DataSetType, DiscussionData, SurveyData, VotingData } from "../interfaces/table.interfaces";
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
    surveysData: SurveyData[];
    setSurveysData: (surveysData: SurveyData[]) => void;
    surveyData: SurveyData;
    setSurveyData: (surveyData: SurveyData) => void;
    countSurveys: number;
    setCountSurveys: (countSurveys: number) => void;
    votingList: VotingData[];
    setVotingList: (votingList: VotingData[]) => void;
    votingData: VotingData;
    setVotingData: (votingData: VotingData) => void;
    countVotingList: number;
    setCountVotingList: (countVotingList: number) => void;
    dataSets: DataSetType[];
    setDataSets: (dataSets: DataSetType[]) => void;
    dataSet: DataSetType;
    setDataSet: (dataSet: DataSetType) => void;
    countDataSet: number;
    setCountDataSet: (countVotingList: number) => void;

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
    surveysData: [],
    setSurveysData: (surveysData: SurveyData[]) => set({ surveysData }),
    surveyData: {} as SurveyData,
    setSurveyData: (surveyData: SurveyData) => set({ surveyData }),
    countSurveys: 0,
    setCountSurveys: (countSurveys: number) => set({ countSurveys }),
    votingList: [],
    setVotingList: (votingList: VotingData[]) => set({ votingList }),
    votingData: {} as VotingData,
    setVotingData: (votingData: VotingData) => set({ votingData }),
    countVotingList: 0,
    setCountVotingList: (countVotingList: number) => set({ countVotingList }),
    dataSets: [],
    setDataSets: (dataSets: DataSetType[]) => set({ dataSets }),
    dataSet: {} as DataSetType,
    setDataSet: (dataSet: DataSetType) => set({ dataSet }),
    countDataSet: 0,
    setCountDataSet: (countDataSet: number) => set({ countDataSet }),

})
)