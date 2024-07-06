'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal';
import { DataSet } from '@prisma/client';
import Spinner from '../../shared/Spinner'; 
import { createDataSet, getDataSets } from '@/server/dataset';

const DataSetTable: React.FC = () => {
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

    const handleSubmit = async (newDataSet: DataSet) => {
        try {
            if (currentUser) {
                const createdDataSet = await createDataSet(newDataSet, currentUser?.id, `Let's start DataSet:  ${newDataSet.topic}`);
                console.log('DataSet created:', createdDataSet);
                updateDataSets()
            }

        } catch (error) {
            console.error('Error creating DataSet:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
    );
};

export default DataSetTable;
