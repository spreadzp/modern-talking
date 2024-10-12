'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal/Modal';
import Spinner from '../../shared/Spinner';
import { createVoting, getVotingList } from '@/server/voting';
import { getNftIdByHash, mintNft } from '@/lib/web3/aptos/nft';
import { listNftWithFixedPrice } from '@/lib/web3/aptos/marketplace';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import ErrorModal from '../../shared/Modal/ErrorModal';
import SuccessModal from '../../shared/Modal/SuccessModal';
import LoginPage from '@/app/login/LoginPage';

const VotingTable: React.FC = () => {
    const { activeAccount } = useKeylessAccounts();
    const router = useRouter();
    const { setVotingList, votingList, currentUser, setVotingData } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isTxProcess, setIsTxProcess] = useState(false)

    const updateVotingList = useCallback(() => {
        getVotingList().then((data) => {
            console.log("🚀 ~ getVotingList ~ data:", data)
            if (data) {
                setVotingList([...votingList, ...data]);
            }
        });
    }, [setVotingList, votingList]);

    useEffect(() => {
        updateVotingList()
    }, [updateVotingList]);

    const handleVotingClick = (Voting: any) => {
        setVotingData(Voting)
        router?.push(`/voting/${Voting.hash}`);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (newVoting: any) => {
        try {
            if (currentUser && activeAccount) {
                const { price, ...restData } = newVoting;

                mintNft(activeAccount, newVoting.hash)
                    .then(async trx => {
                        console.log('!!!!!!!!!!!! mintNft :>>', trx)
                        getNftIdByHash(activeAccount.accountAddress.toString(), newVoting.hash)
                            .then(async (tx) => {
                                console.log('getNftIdByHash tx :>>', tx)
                                const nftId = tx[0] as string
                                restData.nftId = nftId;
                                const newVoting = await createVoting(restData, currentUser?.id, `Let's start Voting:  ${restData.topic}`);
                                if (newVoting) {
                                    setSuccessMessage('Voting created successfully')
                                }
                                setErrorMessage(null)
                                setModalOpen(false)
                                updateVotingList()

                                //     listNftWithFixedPrice(activeAccount, nftId, newVoting.price)
                                //     .then(async (response) => {
                                //         console.log("@@@@@@@@@", response)
                                //         restData.hashLot = response.changes[0].address
                                // })

                            })
                            .catch((error) => {
                                console.error('Error getting NFT ID:', error);
                                setErrorMessage('Error getting NFT ID');
                                setModalOpen(false);
                                updateVotingList()
                            })
                    })
            }

        } catch (error) {
            console.error('Error creating Voting:', error);
            setErrorMessage('Error creating Voting');
        } finally {
            setModalOpen(false);
            setIsTxProcess(false)
        }
    };
    return (
        <>
            {isTxProcess ? <Spinner text='Transaction in process' /> :
                <div>
                    {activeAccount ? <div className="min-h-screen ">
                        <div className="container mx-auto p-4">
                            <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                                Create a new voting
                            </button>
                            {
                                isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Voting" typeModal={'Voting'} /> :
                                    (votingList.length === 0 ? <Spinner /> : <Table
                                        data={votingList}
                                        onBuyClick={handleVotingClick}
                                        buttonLabel="Join"
                                    />)
                            }
                        </div>
                    </div> : <LoginPage />}
                </div>}
            {errorMessage && <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />}
            {successMessage && <SuccessModal message={successMessage} onClose={() => setSuccessMessage(null)} />}

        </>
    );
};

export default VotingTable;
