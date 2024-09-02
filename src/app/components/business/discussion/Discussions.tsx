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
import { getNftIdByHash, mintNft, transferNft } from '@/lib/web3/aptos/nft';
import { listNftWithFixedPrice } from '@/lib/web3/aptos/marketplace';
import ErrorModal from '../../shared/Modal/ErrorModal';
import { fundTestAptAccount } from '@/lib/web3/aptos/provider';
import LoginPage from '@/app/login/LoginPage';
import SuccessModal from '../../shared/Modal/SuccessModal';

const Discussions: React.FC = () => {
    const { activeAccount } = useKeylessAccounts();
    const router = useRouter();
    const { setDiscussionsData, discussionsData, setDiscussionData, currentUser, userBalance } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
            if (userBalance < 0.005 && activeAccount) {
                // fundTestAptAccount(activeAccount?.accountAddress.toString())
                //     .then((tx) => {
                //         console.log('fundTestAptAccount tx :>>', tx)
                //         setErrorMessage('Insufficient balance');
                //     })

            } else {
                if (currentUser && activeAccount) {
                    const { price, ...discussion } = newDiscussion
                    // transferNft(activeAccount, '0x8c05bb5f5aef0816da38e35b6307543870a682119f429bb6000aef6f57ac48a5', '0x6079fe53376605ddf06d6b99de0e6a5b05b004e196ba6a2958483673390136d3')
                    //     .then(async trx => {
                    //         console.log('transferNft :>>', trx)
                    //     })
                    mintNft(activeAccount, discussion.hash)
                        .then(async trx => {
                            console.log('!!!!!!!!!!!! mintNft :>>', trx)
                            getNftIdByHash(activeAccount.accountAddress.toString(), discussion.hash)
                                .then((tx) => {
                                    console.log('getNftIdByHash tx :>>', tx)
                                    const nftId = tx[0] as string
                                    console.log("🚀 ~ .then ~ nftId:", nftId)
                                    console.log(' newDiscussion.price :>>', newDiscussion.price)
                                    const price = newDiscussion.price.toString().split('.')[0]
                                    console.log("🚀 ~ .then ~ price:", price)
                                    listNftWithFixedPrice(activeAccount, nftId, price)
                                        .then(async (response) => {
                                            if (response) {
                                                console.log("@@@@@@@@@", response)
                                                const transferEvent = response.events.find((event: any) => event.type === "0x1::object::TransferEvent");
                                                discussion.nftId = transferEvent.data.object
                                                discussion.hashLot = transferEvent.data.to
                                                debugger
                                                const nd = await createDiscussion(discussion, currentUser?.id, `Let's discuss topic:  ${newDiscussion.topic}`, price);
                                                if (nd) {
                                                    setSuccessMessage('Discussion created successfully')
                                                }
                                                updateDiscussions()
                                            }

                                        })
                                        .catch((error) => {
                                            console.error('Error listing with fixed price:', error);
                                            setErrorMessage((error as Error).message);
                                        });

                                })
                        })
                }
            }


        } catch (error) {
            console.error('Error creating discussion:', error);
            setErrorMessage((error as Error).message);
        } finally {
            closeModal();
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
            {activeAccount ? <div className="min-h-screen ">
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
                        isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Discussion" typeModal={'Discussion'} /> :
                            (discussionsData.length === 0 ? <Spinner /> : <Table
                                data={discussionsData}
                                onBuyClick={handleDiscussionClick}
                                buttonLabel="Join"
                            />)
                    }
                </div>
            </div> : <LoginPage />}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}
        </>
    );
};

export default Discussions;