'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { Modal } from '../../shared/Modal'; 
import Spinner from '../../shared/Spinner'; 
import { createVoting, getVotingList } from '@/server/voting';
import { Voting } from '@prisma/client';
import StarryBackground from '../../shared/StarryBackground';

const VotingTable: React.FC = () => {
    const router = useRouter();
    const { setVotingList, votingList, currentUser, setVotingData } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    const updateVotingList = useCallback(() => {
        getVotingList().then((data) => {
            console.log("🚀 ~ getVotingList ~ data:", data)
            if (data) {
                setVotingList([...votingList, ...data]);
            }
        });
    }, [ setVotingList, votingList]);
    useEffect(() => {  
            updateVotingList() 
    }, [   ]);
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

    const handleSubmit = async (newVoting: Voting) => {
        try {
            if (currentUser) {
                const createdVoting = await createVoting(newVoting, currentUser?.id, `Let's start Voting:  ${newVoting.topic}`);
                console.log('Voting created:', createdVoting);
                updateVotingList()
            }

        } catch (error) {
            console.error('Error creating Voting:', error);
        }
    };
    return (
        <>
        <StarryBackground />
        <div className="min-h-screen ">
            <div className="container mx-auto p-4">
                <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create a new voting
                </button>
                {
                    isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Voting" /> :
                        (votingList.length === 0 ? <Spinner /> : <Table
                            data={votingList}
                            onBuyClick={handleVotingClick}
                            buttonLabel="Join"
                        />)
                }
            </div>
        </div>

        </>
    );
};

export default VotingTable;
