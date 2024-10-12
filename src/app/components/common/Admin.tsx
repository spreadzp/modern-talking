import React, { useEffect, useState } from 'react';
import Title, { TitleEffect, TitleSize } from '../shared/Title';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { RewardStatusEnum, Reward } from '@prisma/client';
import { getRewardsByStatus } from '@/server/reward';
import ExpandableContent from '../shared/ExpandableTable';
import AdminRewardTable from '../business/rewards/AdminRewardTable';
import Spinner from '../shared/Spinner';
import LoginPage from '@/app/login/LoginPage';

const Admin: React.FC = () => {
    const { activeAccount } = useKeylessAccounts();
    const [isAdmin, setIsAdmin] = useState(false);
    const [pendingRewards, setPendingRewards] = useState<Reward[]>([]);
    const [startedRewards, setStartedRewards] = useState<Reward[]>([]);
    const [executedRewards, setExecutedRewards] = useState<Reward[]>([]);
    const [finishedRewards, setFinishedRewards] = useState<Reward[]>([]);

    useEffect(() => {
        if (activeAccount && activeAccount?.accountAddress.toString() === process.env.NEXT_PUBLIC_ADMIN_ADDRESS as string) {
            setIsAdmin(true);
        }
    }, [activeAccount]);

    useEffect(() => {
        const fetchRewards = async (status: RewardStatusEnum, setState: React.Dispatch<React.SetStateAction<Reward[]>>) => {
            const data = await getRewardsByStatus(status);
            console.log("🚀 ~ fetchRewards ~ data:", data)
            setState(data);
        };

        fetchRewards(RewardStatusEnum.Pending, setPendingRewards);
        fetchRewards(RewardStatusEnum.Started, setStartedRewards);
        fetchRewards(RewardStatusEnum.Executing, setExecutedRewards);
        fetchRewards(RewardStatusEnum.Finish, setFinishedRewards);
    }, []);
    if (!activeAccount) return <LoginPage />
    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4 text-white">
                {isAdmin ? (
                    <div className="text-4xl font-bold mb-4">
                        <Title
                            titleName="Admin dashboard"
                            titleSize={TitleSize.H3}
                            titleEffect={TitleEffect.Gradient}
                        />
                        <div className="mb-8">
                            <ExpandableContent title="Rewards status Pending" isOpenContent={false}>
                                {pendingRewards.length === 0 ? <Spinner text='Loading  rewards with status Pending ...' /> : <AdminRewardTable contentData={pendingRewards} />}
                            </ExpandableContent>
                        </div>
                        <div className="mb-8">
                            <ExpandableContent title="Rewards status Started" isOpenContent={false}>
                                {startedRewards.length === 0 ? <Spinner text='Loading rewards with status Started ...' /> : <AdminRewardTable contentData={startedRewards} />}
                            </ExpandableContent>
                        </div>
                        <div className="mb-8">
                            <ExpandableContent title="Rewards status Executed" isOpenContent={false}>
                                {executedRewards.length === 0 ? <Spinner text='Loading rewards with status Executed ...' /> : <AdminRewardTable contentData={executedRewards} />}
                            </ExpandableContent>
                        </div>
                        <div className="mb-8">
                            <ExpandableContent title="Rewards status Finish" isOpenContent={false}>
                                {finishedRewards.length === 0 ? <Spinner text='Loading rewards with status Finish ...' /> : <AdminRewardTable contentData={finishedRewards} />}
                            </ExpandableContent>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Title
                            titleName="You are not admin"
                            titleSize={TitleSize.H3}
                            titleEffect={TitleEffect.Gradient}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;