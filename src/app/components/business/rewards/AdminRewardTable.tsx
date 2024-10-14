'use client';
import React, { use, useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { executeReward, setAddresses, setupReward } from '@/lib/web3/aptos/rewardsContract';
import { updateStatusById } from '@/server/reward';
import { RewardStatusEnum } from '@prisma/client';
import Spinner from '../../shared/Spinner';
import { usePathname, useRouter } from 'next/navigation';

interface AdminRewardTableProps {
    contentData: any[];
}

interface UserDataForReward {
    address: string;
    amount: number;
}

const AdminRewardTable: React.FC<AdminRewardTableProps> = ({ contentData }) => {
    const router = useRouter();
    const { activeAccount } = useKeylessAccounts();
    const [selectedReward, setSelectedReward] = useState<any>(null);
    const [users, setUsers] = useState<UserDataForReward[]>([]);
    const [loading, setLoading] = useState(false);
    const [typeOperation, setTypeOperation] = useState('Loading...')

    useEffect(() => {
        if (selectedReward?.nftId && selectedReward.userAddressesToReward) {
            const sumPerAccount = Math.floor(selectedReward.sum / selectedReward.userAddressesToReward.length);
            const usersData = selectedReward.userAddressesToReward.map((address: string) => ({
                address,
                amount: sumPerAccount
            }));
            setUsers(usersData);
            setLoading(false);
        }
    }, [selectedReward?.nftId, selectedReward?.userAddressesToReward, selectedReward?.sum]);

    const approveListAddresses = useCallback(async (reward: any) => {
        try {
            debugger
            if (activeAccount && reward) {
                const tx = await setAddresses(activeAccount, reward.nftId, reward.userAddressesToReward);
                console.log("🚀 ~ approveListAddresses ~ tx:", tx);
            }
        } catch (error) {
            console.error('Error approving addresses:', error);
        }
    }, [activeAccount]);

    const reloadPage = useCallback(() => {
        router?.push(`/admin`);
    }, [router]);

    const startReward = useCallback(async (reward: any) => {
        try {
            if (activeAccount && reward) {
                const tx = await executeReward(activeAccount, reward.nftId);
                console.log("🚀 ~ executeReward ~ tx:", tx);
                if (tx) {
                    updateStatusById(reward.id, RewardStatusEnum.Finish);
                }

            }
        } catch (error) {
            console.error('Error approving addresses:', error);
        } finally {
            setLoading(false);
            setTypeOperation('');
            reloadPage();
        }
    }, [activeAccount, setLoading, setTypeOperation, reloadPage]);


    const handleStartRewardClick = async (reward: any) => {
        try {
            debugger
            setSelectedReward(reward);
            setLoading(true);
            if (reward.status === 'Pending' && activeAccount) {
                debugger

                setTypeOperation('Setting up reward...')
                const tx = await setupReward(activeAccount, reward.sum, Math.floor(new Date(reward?.startDate as any).getTime() / 1000), reward.nftId);
                if (tx) {
                    console.log("🚀 ~ handleStartRewardClick ~ tx:", tx)
                    const newReward = await updateStatusById(reward.id, RewardStatusEnum.Started);
                    if (newReward) {
                        reloadPage();
                    }
                }
                // Change status to Started
                // Implement the logic to change the status
            } else if (reward.status === 'Started') {
                setTypeOperation('Approving addresses...')
                await approveListAddresses(reward);
                const newReward = await updateStatusById(reward.id, RewardStatusEnum.Executing);
                if (newReward) {
                    reloadPage();
                }
            } else if (reward.status === 'Executing') {
                setTypeOperation('Starting reward...')
                await startReward(reward);
                await updateStatusById(reward.id, RewardStatusEnum.Finish);
                reloadPage();
            }
        } catch (error) {
            console.error('Error approving addresses:', error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="container mx-auto p-4 shadow-lg rounded-lg">
            {loading ? <Spinner text={typeOperation} /> : <Table
                data={contentData}
                buttonLabel="Next step"
                onBuyClick={handleStartRewardClick}
            />}
        </div>
    );
};

export default AdminRewardTable;