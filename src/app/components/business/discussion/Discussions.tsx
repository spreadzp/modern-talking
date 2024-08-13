'use client'
import React, { useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { createDiscussion, getDiscussions } from '@/server/discussion-db';
import { Modal } from '../../shared/Modal/Modal'; 
import Spinner from '../../shared/Spinner';
import StarryBackground from '../../shared/StarryBackground';
import Title, { TitleEffect, TitleSize } from '../../shared/Title';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { getNftIdByHash, mintNft } from '@/lib/web3/aptos/nft';
import { listWithFixedPrice } from '@/lib/web3/aptos/marketplace';

const Discussions: React.FC = () => {
    const { activeAccount } = useKeylessAccounts();
    const router = useRouter();
    const { setDiscussionsData, discussionsData, setDiscussionData, currentUser } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        updateDiscussions()
    }, []);
    const handleDiscussionClick = (discussion: any) => {
        setDiscussionData(discussion)
        router?.push(`/discussion/${discussion.hash}`);
    };
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (newDiscussion: any) => {//  Discussion & {price: number}) => {
        try {
            if (currentUser && activeAccount) {
                const { price, ...discussion } = newDiscussion 
                mintNft(activeAccount, discussion.hash)
                    .then(async trx => {
                        console.log('!!!!!!!!!!!! mintNft :>>', trx)
                        getNftIdByHash(activeAccount.accountAddress.toString(), discussion.hash)
                            .then((tx) => {
                                console.log('getNftIdByHash tx :>>', tx)
                                const nftId = tx[0] as string
                                listWithFixedPrice(activeAccount, nftId, newDiscussion.price)
                                    .then(async (response) => {
                                        console.log("@@@@@@@@@", response)
                                        discussion.hashLot = response.changes[0].address
                                        debugger
                                        await createDiscussion(discussion, currentUser?.id, `Let's discuss topic:  ${newDiscussion.topic}`, price);
                                        updateDiscussions()
                                    })

                            })
                    })
            }

        } catch (error) {
            console.error('Error creating discussion:', error);
        }
    };
    const updateDiscussions = () => {
        getDiscussions().then((data) => {

            setDiscussionsData([...discussionsData, ...data])
        })
    }

    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <div className="flex items-center justify-center"><Title
                        titleName="Discussions"
                        titleSize={TitleSize.H3}
                        titleEffect={TitleEffect.Gradient}
                    /></div>
                    <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                        Create new discussion
                    </button>
                    {
                        isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Discussion"  typeModal={'Discussion'} /> :
                            (discussionsData.length === 0 ? <Spinner /> : <Table
                                data={discussionsData}
                                onBuyClick={handleDiscussionClick}
                                buttonLabel="Join"
                            />)
                    }
                </div>
            </div>
        </>
    );
};

export default Discussions;