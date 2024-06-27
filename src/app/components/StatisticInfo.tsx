
import Table from "./Table";
import { useRouter } from "next/navigation";
import { StatisticTableData  } from "../interfaces/table.interfaces";
import { getCountDiscussions } from "@/server/discussion-db";
import { useEffect } from "react";
import { useSiteStore } from "../hooks/store";
import { getCountSurveys } from "@/server/survey";


export const StatisticInfo =   () => {
    const { setCountDiscussions, countDiscussions, setCountSurveys, countSurveys  } = useSiteStore()
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
        .catch((error) => {
            console.error('Error fetching surveys:', error);
        });
    }, [ setCountDiscussions, setCountSurveys ]);
    const tableData: StatisticTableData[] = [
        { id: 1, name: 'Discussions', amount: countDiscussions, rewardSumDollar: 1500, rewardSumInTokens: 12233333,  routeName: 'discussions' },
        { id: 2, name: 'Surveys', amount: countSurveys, rewardSumDollar: 2157, rewardSumInTokens: 54545,  routeName: 'surveys' },
        { id: 3, name: 'Voting', amount: 15, rewardSumDollar: 3432, rewardSumInTokens: 45354,  routeName: 'voting' },
        { id: 4, name: 'Data Sets', amount: 12, rewardSumDollar: 3435, rewardSumInTokens: 45435,  routeName: 'ai-tagging' },
    ];
    const router = useRouter();

    const handleStatisticClick = (statistic: any) => {
        router?.push(`/${statistic.routeName}`);
    };

    return (
        <div className=" bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">  
                <Table data={tableData} onBuyClick={handleStatisticClick} buttonLabel="Join" />
            </div>
        </div>
    );
};