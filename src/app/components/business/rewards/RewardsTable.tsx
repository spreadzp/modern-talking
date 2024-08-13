'use client'
import { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal/Modal';
import { Reward, Survey } from '@prisma/client';
import Spinner from '../../shared/Spinner';
import StarryBackground from '../../shared/StarryBackground';
import { createReward, createRewardByResource, getRewards, getRewardsByContent } from '@/server/reward';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { useRouter } from 'next/navigation';

interface RewardsTableProps {
    contentData: any;
}
const RewardsTable: React.FC<RewardsTableProps> = ({ contentData }) => {
    const { activeAccount } = useKeylessAccounts();
    const [isResourceLot, setIsResourceLot] = useState(false);
    const { setRewards, rewards, currentUser, setReward } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (contentData.owner.address === activeAccount?.accountAddress.toString()) {

            setIsResourceLot(true)
        }
    }, [setIsResourceLot, contentData])
    const updateRewards = useCallback(() => {
        if (contentData) {
            getRewardsByContent(contentData).then((data) => {
                if (data) {
                    const rewardIdMap = new Map(rewards.map(reward => [reward.id, reward]));

                    // Filter out duplicates
                    const uniqueRewards = data.filter(reward => !rewardIdMap.has(reward.id));

                    // Update the state with the new unique rewards
                    setRewards([...rewards, ...uniqueRewards]);
                }
            });
        }
    }, [setRewards, rewards, contentData]);

    useEffect(() => {
        updateRewards()
    }, []);

    const handleRewardClick = useCallback((reward: any) => {
        console.log("🚀 ~ handleRewardClick ~ reward:", reward)
        setReward(reward)
        router?.push(`/reward/${reward.id}`);
    }, [setReward, router]);

    const openModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = useCallback(async (newReward: Reward) => {
        try {
            if (newReward) {
                const createdReward = await createRewardByResource(newReward, contentData);
                if (createdReward) {
                    updateRewards();
                }
            }
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    }, [currentUser, updateRewards]);

    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4  shadow-lg rounded-lg">
                    {isResourceLot && <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                        Create a new Reward
                    </button>}
                    {
                        isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create a new Reward" typeModal={'Reward'} /> :
                            (rewards.length === 0 ? <Spinner text='Loading rewards...'/> : <Table
                                data={rewards}
                                onBuyClick={handleRewardClick}
                                buttonLabel="Join"
                            />)
                    }
                </div>
            </div>
        </>
    );
};

export default RewardsTable;