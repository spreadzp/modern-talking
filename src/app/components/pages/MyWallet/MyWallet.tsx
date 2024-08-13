import React, { useState, useEffect } from 'react';
import JoinActivityModal from './JoinActivityModal';
import StarryBackground from '../../shared/StarryBackground';
import Title, { TitleEffect, TitleSize } from '../../shared/Title';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { getDiscussionListByOwnerAddress } from '@/server/discussion-db';
import AssetsTable from './AssetsTable';
import MyRewardsTable from './MyRewardsTable';
import { getSurveyListByOwnerAddress } from '@/server/survey';
import { useRouter } from 'next/navigation';
import { getVotingListByOwnerAddress } from '@/server/voting';
import { getDataSetListByOwnerAddress } from '@/server/dataset';
import Spinner from '../../shared/Spinner'; // Assuming you have a Spinner component
import Table from '../../shared/Table'; // Assuming you have a Table component
import { useSiteStore } from '@/app/hooks/store';

export interface Asset {
    id: number;
    name: string;
    ownedMe: number;
}

export interface Reward {
    id: number;
    name: string;
    ownedMe: number;
    sum: number;
    airdropDate: string;
}

const MyWallet: React.FC = () => {
    const {   setDataSet, setDiscussionData, setSurveyData, setVotingData } = useSiteStore()
    const { activeAccount } = useKeylessAccounts();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Asset | Reward | null>(null);
    const [showDiscussions, setShowDiscussions] = useState<boolean>(false);
    const [showSurveys, setShowSurveys] = useState<boolean>(false);
    const [showVoting, setShowVoting] = useState<boolean>(false);
    const [showDatasets, setShowDatasets] = useState<boolean>(false);
    const [discussionResp, setDiscussionResp] = useState<any[]>([]);
    const [surveyResp, setSurveyResp] = useState<any[]>([]);
    const [votingResp, setVotingResp] = useState<any[]>([]);
    const [dataSetResp, setDataSetResp] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (activeAccount) {
            const accountAddress = activeAccount.accountAddress.toString();

            const fetchData = async () => {
                try {
                    const [discussions, surveys, voting, datasets] = await Promise.all([
                        getDiscussionListByOwnerAddress(accountAddress),
                        getSurveyListByOwnerAddress(accountAddress),
                        getVotingListByOwnerAddress(accountAddress),
                        getDataSetListByOwnerAddress(accountAddress)
                    ]);

                    setDiscussionResp(discussions);
                    setSurveyResp(surveys);
                    setVotingResp(voting);
                    setDataSetResp(datasets);

                    const assetsData: Asset[] = [
                        { id: 1, name: 'Discussions', ownedMe: discussions.length },
                        { id: 2, name: 'Surveys', ownedMe: surveys.length },
                        { id: 3, name: 'Voting', ownedMe: voting.length },
                        { id: 4, name: 'Datasets', ownedMe: datasets.length }
                    ];

                    const mockRewards: Reward[] = [
                        { id: 1, name: 'Reward 1', ownedMe: 10, sum: 50, airdropDate: '2023-12-01' },
                        { id: 2, name: 'Reward 2', ownedMe: 15, sum: 75, airdropDate: '2023-11-15' },
                        { id: 3, name: 'Reward 3', ownedMe: 20, sum: 100, airdropDate: '2023-10-30' }
                    ];

                    setAssets(assetsData.filter(asset => asset.ownedMe > 0));
                    setRewards(mockRewards);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        } else {
            router?.push(`/`);
        }
    }, [activeAccount]);

    const handleDiscussionClick = (discussion: any) => {
        setDiscussionData(discussion)
        router?.push(`/discussion/${discussion.hash}`);
    };
    const handleJoin = (item: any) => {
        switch (item.name) {
            case 'Discussions':
                setShowDiscussions(true);
                break;
            case 'Surveys':
                setShowSurveys(true);
                break;
            case 'Voting':
                setShowVoting(true);
                break;
            case 'Datasets':
                setShowDatasets(true);
                break;
            default:
                break;
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const joinActivity = () => {
        console.log('Joining activity:', selectedItem);
        closeModal();
    };
    const handleSurveyClick = (survey: any) => {
        setSurveyData(survey)
        router?.push(`/survey/${survey.hash}`);
    };
    const handleVotingClick = (Voting: any) => {
        setVotingData(Voting)
        router?.push(`/voting/${Voting.hash}`);
    };
    const handleDataSetClick = (DataSet: any) => {
        setDataSet(DataSet)
        router?.push(`/data-set/${DataSet.hash}`);
    };
    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <div className="flex items-center justify-center">
                        <Title
                            titleName="My Activity"
                            titleSize={TitleSize.H3}
                            titleEffect={TitleEffect.Gradient}
                        />
                    </div>
                    <Title
                        titleName="Assets"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    />
                    {assets.length === 0 ? <Spinner /> : <AssetsTable assets={assets} onJoin={handleJoin} />}

                    <Title
                        titleName="Rewards"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    />
                    <MyRewardsTable rewards={rewards} onJoin={handleJoin} />

                    {showDiscussions && (discussionResp.length === 0 ? <Spinner /> :<div>    <Title
                        titleName="Discussion"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    /> <Table data={discussionResp} onBuyClick={handleDiscussionClick} buttonLabel="Join" /></div>)}
                    {showSurveys && (surveyResp.length === 0 ? <Spinner /> :<div>    <Title
                        titleName="Surveys"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    /> <Table data={surveyResp} onBuyClick={handleSurveyClick} buttonLabel="Join" /></div>)}
                    {showVoting && (votingResp.length === 0 ? <Spinner /> :<div>    <Title
                        titleName="Voting"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    /> <Table data={votingResp} onBuyClick={handleVotingClick} buttonLabel="Join" /></div>)}
                    {showDatasets && (dataSetResp.length === 0 ? <Spinner /> : <div>    <Title
                        titleName="Data sets"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    /><Table data={dataSetResp} onBuyClick={handleDataSetClick} buttonLabel="Join" /></div>)}

                    {showModal && (
                        <JoinActivityModal
                            item={selectedItem}
                            onClose={closeModal}
                            onJoin={joinActivity}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default MyWallet;