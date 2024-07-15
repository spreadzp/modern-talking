
import Table from "../../shared/Table";
import { useRouter } from "next/navigation";
import { StatisticTableData } from "../../../interfaces/table.interfaces";
import { getCountDiscussions } from "@/server/discussion-db";
import { useEffect } from "react";
import { useSiteStore } from "../../../hooks/store";
import { getCountSurveys } from "@/server/survey";
import { getCountDataSets } from "@/server/dataset";
import { getCountVoting } from "@/server/voting";
import StarryBackground from "../../shared/StarryBackground";


export const StatisticInfo = () => {
    const { setCountDiscussions, countDiscussions, setCountSurveys, countSurveys, countDataSet, setCountDataSet, countVotingList, setCountVotingList } = useSiteStore()
    useEffect(() => {
        getCountDiscussions()
            .then((data) => {
                setCountDiscussions(data)
            })
            .catch((error) => {
                console.error('Error fetching discussions:', error);
            });

        getCountSurveys()
            .then((data) => {
                setCountSurveys(data)
            })
        getCountDataSets()
            .then((data) => {
                setCountDataSet(data)
            })
        getCountVoting()
            .then((data) => {
                setCountVotingList(data)
            })
            .catch((error) => {
                console.error('Error fetching surveys:', error);
            });
    }, [setCountDiscussions, setCountSurveys, setCountDataSet, setCountVotingList]);
    const tableData: StatisticTableData[] = [
        { id: 1, name: 'Discussions', amount: countDiscussions, rewardSumDollar: 1500, rewardSumInTokens: 12233333, routeName: 'discussions' },
        { id: 2, name: 'Surveys', amount: countSurveys, rewardSumDollar: 2157, rewardSumInTokens: 54545, routeName: 'surveys' },
        { id: 3, name: 'Voting', amount: countVotingList, rewardSumDollar: 3432, rewardSumInTokens: 45354, routeName: 'voting-list' },
        { id: 4, name: 'Data Sets', amount: countDataSet, rewardSumDollar: 3435, rewardSumInTokens: 45435, routeName: 'data-sets' },
    ];
    const router = useRouter();

    const handleStatisticClick = (statistic: any) => {
        router?.push(`/${statistic.routeName}`);
    };

    return (
        <>
        <StarryBackground />
        
        <div className="">
            <div className="container mx-auto p-4">
                <Table data={tableData} onBuyClick={handleStatisticClick} buttonLabel="Join" />
            </div>
        </div>

        </>
    );
};