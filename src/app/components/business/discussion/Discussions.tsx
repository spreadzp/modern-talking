'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { createDiscussion, getDiscussions } from '@/server/discussion-db';
import { Modal } from '../../shared/Modal/Modal';
import Spinner from '../../shared/Spinner';
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
    const { setDiscussionsData, discussionsData, setDiscussionData, currentUser } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isTxProcess, setIsTxProcess] = useState(false)

    const updateDiscussions = useCallback(async () => {
        getDiscussions().then((data) => {
            if (data) {
                setDiscussionsData([...discussionsData, ...data])
            }
        })
    }, [setDiscussionsData]);

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

    const handleSubmit = useCallback(async (newDiscussion: any) => {
        try {
            if (currentUser && activeAccount) {
                setIsTxProcess(true);
                const discussion = newDiscussion
                mintNft(activeAccount, discussion.hash)
                    .then(async trx => {
                        console.log('!!!!!!!!!!!! mintNft :>>', trx)
                        getNftIdByHash(activeAccount.accountAddress.toString(), discussion.hash)
                            .then(async (tx) => {
                                console.log('getNftIdByHash tx :>>', tx)
                                const nftId = tx[0] as string
                                discussion.nftId = nftId
                                const nd = await createDiscussion(discussion, currentUser?.id, `Let's discuss topic:  ${newDiscussion.topic}`);
                                if (nd) {
                                    setSuccessMessage('Discussion created successfully')
                                }
                                updateDiscussions()

                            })
                    })
                    .catch((error) => {
                        console.error('Error minting NFT:', error);
                        setErrorMessage((error as Error).message);
                    });
            }


        } catch (error) {
            console.error('Error creating discussion:', error);
            setErrorMessage((error as Error).message);
        } finally {
            closeModal();
            setIsTxProcess(false)
        }
    }, [activeAccount, currentUser, updateDiscussions]);


    return (
        <>
            {isTxProcess ? <Spinner text='Transaction in process' /> :
                <div> {activeAccount ?
                    <div className="min-h-screen ">
                        <div className="container mx-auto p-4">
                            <div className="flex items-center justify-center">
                                <Title
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
                    </div> :
                    <LoginPage />}
                </div>}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}
        </>
    );
};

export default Discussions;