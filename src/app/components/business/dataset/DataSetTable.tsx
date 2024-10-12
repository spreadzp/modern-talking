'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal/Modal';
import { DataSet } from '@prisma/client';
import Spinner from '../../shared/Spinner';
import { createDataSet, getDataSets } from '@/server/dataset';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { getNftIdByHash, mintNft } from '@/lib/web3/aptos/nft';
import { listNftWithFixedPrice } from '@/lib/web3/aptos/marketplace';
import ErrorModal from '../../shared/Modal/ErrorModal';
import SuccessModal from '../../shared/Modal/SuccessModal';
import LoginPage from '@/app/login/LoginPage';

const DataSetTable: React.FC = () => {
    const { activeAccount } = useKeylessAccounts();
    const router = useRouter();
    const { setDataSets, dataSets, currentUser, setDataSet } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isTxProcess, setIsTxProcess] = useState(false)

    const updateDataSets = useCallback(() => {
        getDataSets().then((data) => {
            if (data) {
                setDataSets([...dataSets, ...data]);
            }
        });
    }, [setDataSets, dataSets]);

    useEffect(() => {
        updateDataSets()
    }, [updateDataSets]);

    const handleDataSetClick = (DataSet: any) => {
        setDataSet(DataSet)
        router?.push(`/data-set/${DataSet.hash}`);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = useCallback(async (newDataSet: any) => {
        try {
            if (currentUser && activeAccount) {
                const { price, ...restData } = newDataSet
                mintNft(activeAccount, restData.hash)
                    .then(async trx => {
                        console.log('!!!!!!!!!!!! mintNft :>>', trx)
                        getNftIdByHash(activeAccount.accountAddress.toString(), restData.hash)
                            .then(async (tx) => {
                                console.log('getNftIdByHash tx :>>', tx)
                                const nftId = tx[0] as string
                                restData.nftId = nftId;
                                const createdDataSet = await createDataSet(restData, currentUser?.id, `Let's start DataSet:  ${restData.topic}`);
                                if (createdDataSet) {
                                    setSuccessMessage("DataSet created successfully")
                                }
                                setErrorMessage(null)
                                setModalOpen(false)
                                updateDataSets()
                                //     listNftWithFixedPrice(activeAccount, nftId, newDataSet.price)
                                //     .then(async (response) => {
                                //         console.log("@@@@@@@@@", response)
                                //         restData.hashLot = response.changes[0].address 
                                // })

                            })
                            .catch((error) => {
                                console.error('Error getting NFT ID:', error);
                                setErrorMessage(error.message);
                            });
                    })

            }

        } catch (error) {
            console.error('Error creating DataSet:', error);
            setErrorMessage((error as Error).message);
        } finally {
            setIsTxProcess(false);
        }
    }, [currentUser, activeAccount, updateDataSets]);
    return (
        <>
            {isTxProcess ? <Spinner text='Transaction in process' /> :
                <div>
                    {activeAccount ? <div className="min-h-screen ">
                        <div className="container mx-auto p-4">
                            <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                                Create a new DataSet
                            </button>
                            {
                                isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create DataSet" typeModal={'DataSet'} /> :
                                    (dataSets.length === 0 ? <Spinner /> : <Table
                                        data={dataSets}
                                        onBuyClick={handleDataSetClick}
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

export default DataSetTable;
