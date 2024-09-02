'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal/Modal';
import Spinner from '../../shared/Spinner';
import { createSurvey, getSurveys } from '@/server/survey';
import StarryBackground from '../../shared/StarryBackground';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { getNftIdByHash, mintNft } from '@/lib/web3/aptos/nft';
import { listNftWithFixedPrice } from '@/lib/web3/aptos/marketplace';
import ErrorModal from '../../shared/Modal/ErrorModal';
import SuccessModal from '../../shared/Modal/SuccessModal';
import LoginPage from '@/app/login/LoginPage';

const SurveyTable: React.FC = () => {
    const MIN_START_SURVEY_PRICE = 25; //TODO: get from config
    const { activeAccount } = useKeylessAccounts();
    const router = useRouter();
    const { setSurveysData, surveysData, currentUser, setSurveyData } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const updateSurveys = useCallback(() => {
        getSurveys().then((data) => {
            if (data) {
                setSurveysData([...surveysData, ...data]);
            }
        });
    }, [setSurveysData, surveysData]);
    useEffect(() => {
        updateSurveys()
    }, []);
    const handleSurveyClick = (survey: any) => {
        setSurveyData(survey)
        router?.push(`/survey/${survey.hash}`);
    };
    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (newSurvey: any) => {
        try {
            if (currentUser && activeAccount) {
                const { price, ...restData } = newSurvey
                //const priceForSurvey = !price ? MIN_START_SURVEY_PRICE : +price
                // console.log("🚀 ~ handleSubmit ~ price:", price)


                mintNft(activeAccount, restData.hash)
                    .then(async trx => {
                        console.log('!!!!!!!!!!!! mintNft :>>', trx)
                        getNftIdByHash(activeAccount.accountAddress.toString(), restData.hash)
                            .then((tx) => {
                                console.log('getNftIdByHash tx :>>', tx)
                                const nftId = tx[0] as string
                                const price = newSurvey.price.toString().split('.')[0]
                                listNftWithFixedPrice(activeAccount, nftId, price)
                                    .then(async (response) => {
                                        console.log("@@@@@@@@@", response)
                                        const transferEvent = response.events.find((event: any) => event.type === "0x1::object::TransferEvent");
                                        restData.nftId = transferEvent.data.object
                                        restData.hashLot = transferEvent.data.to
                                        const newSurvey = await createSurvey(restData, currentUser?.id, `Let's start survey:  ${restData.topic}`, price);
                                        if (newSurvey) {
                                            setSuccessMessage('Survey created successfully')
                                        }
                                        setErrorMessage(null)
                                        setModalOpen(false)
                                        updateSurveys()
                                    })

                            })
                    })
                    .catch((error) => {
                        console.error('Error minting NFT:', error);
                        setErrorMessage((error as Error).message);

                    });
            }

        } catch (error) {
            console.error('Error creating survey:', error);
            setErrorMessage((error as Error).message);
        }
    };
    return (
        <>
            <StarryBackground />
            {activeAccount ? <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                        Create a new survey
                    </button>
                    {
                        isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Survey" typeModal={'Survey'} /> :
                            (surveysData.length === 0 ? <Spinner /> : <Table
                                data={surveysData}
                                onBuyClick={handleSurveyClick}
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

export default SurveyTable;
