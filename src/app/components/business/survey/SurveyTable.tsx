'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal';
import { Survey } from '@prisma/client';
import Spinner from '../../shared/Spinner';
import { createSurvey, getSurveys } from '@/server/survey';

const SurveyTable: React.FC = () => {
    const router = useRouter();
    const { setSurveysData, surveysData, currentUser, setSurveyData } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const updateSurveys = useCallback(() => {
        getSurveys().then((data) => {
            if (data) {
                setSurveysData([...surveysData, ...data]);
            }
        });
    }, [ setSurveysData, surveysData  ]);
    useEffect(() => { 
            updateSurveys() 
    }, [ ]);
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

    const handleSubmit = async (newSurvey: Survey) => {
        try {
            if (currentUser) {
                const createdSurvey = await createSurvey(newSurvey, currentUser?.id, `Let's start survey:  ${newSurvey.topic}`);
                console.log('Survey created:', createdSurvey);
                updateSurveys()
            }

        } catch (error) {
            console.error('Error creating survey:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create a new survey
                </button>
                {
                    isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Survey" /> :
                        (surveysData.length === 0 ? <Spinner /> : <Table
                            data={surveysData}
                            onBuyClick={handleSurveyClick}
                            buttonLabel="Join"
                        />)
                }
            </div>
        </div>
    );
};

export default SurveyTable;
