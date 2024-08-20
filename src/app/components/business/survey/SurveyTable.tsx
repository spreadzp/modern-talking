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

const SurveyTable: React.FC = () => {
    const MIN_START_SURVEY_PRICE = 25; //TODO: get from config
    const { activeAccount } = useKeylessAccounts();
    const router = useRouter();
    const { setSurveysData, surveysData, currentUser, setSurveyData } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
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
                const priceForSurvey = !price ? MIN_START_SURVEY_PRICE : +price
                console.log("🚀 ~ handleSubmit ~ price:", price)


                mintNft(activeAccount, restData.hash)
                    .then(async trx => {
                        console.log('!!!!!!!!!!!! mintNft :>>', trx)
                        getNftIdByHash(activeAccount.accountAddress.toString(), restData.hash)
                            .then((tx) => {
                                console.log('getNftIdByHash tx :>>', tx)
                                const nftId = tx[0] as string
                                listNftWithFixedPrice(activeAccount, nftId, priceForSurvey)
                                    .then(async (response) => {
                                        console.log("@@@@@@@@@", response)
                                        restData.hashLot = response.changes[0].address
                                        await createSurvey(restData, currentUser?.id, `Let's start survey:  ${restData.topic}`, priceForSurvey);

                                        updateSurveys()
                                    })

                            })
                    })
            }

        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };
    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                        Create a new survey
                    </button>
                    {
                        isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Survey"  typeModal={'Survey'} /> :
                            (surveysData.length === 0 ? <Spinner /> : <Table
                                data={surveysData}
                                onBuyClick={handleSurveyClick}
                                buttonLabel="Join"
                            />)
                    }
                </div>
            </div>

        </>
    );
};

export default SurveyTable;
