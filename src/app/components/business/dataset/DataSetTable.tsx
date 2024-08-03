'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal';
import { DataSet } from '@prisma/client';
import Spinner from '../../shared/Spinner'; 
import { createDataSet, getDataSets } from '@/server/dataset';
import StarryBackground from '../../shared/StarryBackground';

const DataSetTable: React.FC = () => {
    const MIN_START_DATA_SET_PRICE = 25;
    const router = useRouter();
    const { setDataSets, dataSets, currentUser, setDataSet } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const updateDataSets = useCallback(() => {
        getDataSets().then((data) => {
            if (data) {
                setDataSets([...dataSets, ...data]);
            }
        });
    }, [ setDataSets, dataSets  ]);
    useEffect(() => { 
            updateDataSets() 
    }, [ ]);
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

    const handleSubmit = async (newDataSet: any) => {
        try {
            if (currentUser) {
                const {price, ...restData} = newDataSet 
                const priceForDataSet = !price ? MIN_START_DATA_SET_PRICE : +price
                const createdDataSet = await createDataSet(restData, currentUser?.id, `Let's start DataSet:  ${restData.topic}`, priceForDataSet);
                console.log('DataSet created:', createdDataSet);
                updateDataSets()
            }

        } catch (error) {
            console.error('Error creating DataSet:', error);
        }
    };
    return (
        <>
        <StarryBackground />
        <div className="min-h-screen ">
            <div className="container mx-auto p-4">
                <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded">
                    Create a new DataSet
                </button>
                {
                    isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create DataSet" /> :
                        (dataSets.length === 0 ? <Spinner /> : <Table
                            data={dataSets}
                            onBuyClick={handleDataSetClick}
                            buttonLabel="Join"
                        />)
                }
            </div>
        </div>

        </>
    );
};

export default DataSetTable;
