
import Table from "../../shared/Table";
import { useRouter } from "next/navigation";
import { StatisticTableData } from "../../../interfaces/table.interfaces";
import { getCountDiscussions } from "@/server/discussion-db";
import { useEffect, useState } from "react";
import { useSiteStore } from "../../../hooks/store";
import { getCountSurveys } from "@/server/survey";
import { getCountDataSets } from "@/server/dataset";
import { getCountVoting } from "@/server/voting";
import { countRewardsByResource } from "@/server/reward";
type RewardsSum = {
    survey: number,
    voting: number,
    dataset: number,
    discussion: number,
}

export const StatisticInfo = () => {
    const [rewardsSum, setRewardsSum] = useState({} as RewardsSum)
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
        countRewardsByResource()
            .then((data) => {
                console.log("🚀 ~ .then ~ data:", data)
                setRewardsSum(data)
            })
    }, [setCountDiscussions, setCountSurveys, setCountDataSet, setCountVotingList]);
    const tableData: StatisticTableData[] = [
        { id: 1, name: 'Discussions', amount: countDiscussions, rewardSumInUsd: rewardsSum.discussion, routeName: 'discussions' },
        { id: 2, name: 'Surveys', amount: countSurveys, rewardSumInUsd: rewardsSum.survey, routeName: 'surveys' },
        { id: 3, name: 'Voting', amount: countVotingList, rewardSumInUsd: rewardsSum.voting, routeName: 'voting-list' },
        { id: 4, name: 'Data Sets', amount: countDataSet, rewardSumInUsd: rewardsSum.dataset, routeName: 'data-sets' },
    ];
    const router = useRouter();

    const handleStatisticClick = (statistic: any) => {
        router?.push(`/${statistic.routeName}`);
    };

    return (
        <>

            <div className="">
                <div className="container mx-auto p-4">
                    <Table data={tableData} onBuyClick={handleStatisticClick} buttonLabel="Join" />
                </div>
            </div>

        </>
    );
};