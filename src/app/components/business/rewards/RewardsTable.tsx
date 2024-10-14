'use client'
import { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal/Modal';
import { Reward, RewardStatusEnum } from '@prisma/client';
import Spinner from '../../shared/Spinner';
import { createRewardByResource, getRewardsByContent } from '@/server/reward';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { useRouter } from 'next/navigation';
import { getRewardInfo, setupReward } from '@/lib/web3/aptos/rewardsContract';
import { getMarketplaceByHash } from '@/server/marketplace';
import ErrorModal from '../../shared/Modal/ErrorModal';
import SuccessModal from '../../shared/Modal/SuccessModal';
import SetupAddresses from './SetupAddresses';
import { getUsersAddresses } from '@/server/users';
import RewardsInProgress from './RewardsInProgress';

export type UpComingRewards = {
    amount: string,
    endTimeToStartRewards: Date,
    nftId: string,
    isStarted: boolean
}
interface RewardsTableProps {
    contentData: any;
}
const RewardsTable: React.FC<RewardsTableProps> = ({ contentData }) => {
    const { activeAccount } = useKeylessAccounts();
    const [isResourceLot, setIsResourceLot] = useState(false);
    const { setRewards, rewards, currentUser, setReward } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const [activeNftId, setActiveNftId] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [currentReward, setCurrentReward] = useState({} as UpComingRewards);
    const [isSetupAddresses, setSetupAddresses] = useState(false)
    const [usersAddresses, setUsersAddresses] = useState<string[]>([])
    const [statusReward, setStatusReward] = useState<RewardStatusEnum>(RewardStatusEnum.Pending)
    const router = useRouter();
    useEffect(() => {
        debugger

        if (contentData) {
            const usersIds = contentData.chat.messages.map((message: any) => message.userId)
            const lastReward = contentData.rewards.length > 0 ? contentData.rewards[contentData.rewards.length - 1] : null
            const lastRewardStatus = lastReward ? lastReward.status : RewardStatusEnum.Pending
            setStatusReward(lastRewardStatus)
            setCurrentReward({ amount: lastReward.sum, endTimeToStartRewards: new Date(+lastReward.startDate * 1000), nftId: contentData.nftId, isStarted: lastReward.status === RewardStatusEnum.Started })
            // console.log("🚀 ~ useEffect ~ usersIds:", usersIds   )
            // getUsersAddresses(usersIds)
            //     .then((addr: string[]) => {
            //         setUsersAddresses(() => [...addr])
            //     })
            // console.log("🚀 ~ useEffect ~ contentData:", contentData)
            // if (contentData.listingStatus === 'Listed') {
            //     {
            //         getMarketplaceByHash(contentData.hash).then((data) => {
            //             if (data) {
            //                 setActiveNftId(data.nftId);
            //                 getRewardInfo(data.nftId)
            //                     .then(data => {
            //                         setCurrentReward({ amount: data[0], endTimeToStartRewards: new Date(+data[1] * 1000), nftId: data[2], isStarted: data[3] })
            //                         console.log('getRewardInfo data :>>', data)
            //                     })
            //                     .catch(err => console.log('not init yet:>>', err))
            //             }
            //         });
            //     }

            // }
        }
    }, [contentData, activeAccount, setUsersAddresses])

    useEffect(() => {
        debugger
        if (contentData.owner.address === activeAccount?.accountAddress.toString()) {
            setIsResourceLot(true);
        }
    }, [activeAccount, contentData])

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
        console.log('currentReward.endTimeToStartRewards >= Date.now() :>>', currentReward.endTimeToStartRewards, new Date(Date.now()));
        if (!currentReward.isStarted && currentReward.endTimeToStartRewards <= new Date(Date.now())) {
            setSetupAddresses(true);
        }
    }, [currentReward, setSetupAddresses]);

    useEffect(() => {
        updateRewards()
    }, []);

    const openModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = useCallback(async (newReward: Reward) => {
        try {
            debugger
            if (newReward && activeAccount) {
                try {
                    const createdReward = await createRewardByResource(newReward, contentData);
                    if (createdReward) {
                        updateRewards();
                    }
                    setSuccessMessage('Reward created successfully need to wait for approval by admin');
                    // const tx = await setupReward(activeAccount, newReward.sum, Math.floor(new Date(newReward?.startDate as any).getTime() / 1000), activeNftId);
                    // if (tx) {
                    //     const createdReward = await createRewardByResource(newReward, contentData);
                    //     if (createdReward) {
                    //         updateRewards();
                    //     }
                    //     setSuccessMessage('Reward created successfully');
                    // }
                } catch (error) {
                    console.log("🚀 ~ handleSubmit ~ error:", error)
                    setErrorMessage('Error creating reward');
                    return;
                }
            }
        } catch (error) {
            console.error('Error creating survey:', error);
        }
    }, [updateRewards, activeAccount, contentData, setErrorMessage, setSuccessMessage]);

    return (
        <>
            <div className="min-h-screen ">
                <div className="container mx-auto p-4  shadow-lg rounded-lg">
                    <div>{
                        contentData.owner.address === activeAccount?.accountAddress.toString() &&
                        <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                            Create a new Reward
                        </button>}
                        {currentReward && statusReward === RewardStatusEnum.Started && <RewardsInProgress currentReward={contentData.rewards[0]} />}
                        {statusReward === RewardStatusEnum.Executing &&
                            <SetupAddresses currentReward={{ nftId: currentReward.nftId, usersAddresses, totalSum: +currentReward.amount }} />}

                        {statusReward === RewardStatusEnum.Finish && <Spinner text='The rewards program has not yet been established' />}
                    </div>
                    <div>
                        {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create a new Reward" typeModal={'Reward'} />}
                    </div>
                </div>
            </div>
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}
        </>
    );
};

export default RewardsTable;