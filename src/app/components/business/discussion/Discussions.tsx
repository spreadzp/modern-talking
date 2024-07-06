'use client'
import React, { useEffect, useState } from 'react';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import { createDiscussion, getDiscussions } from '@/server/discussion-db';
import { Modal } from '../../shared/Modal';
import { Discussion } from '@prisma/client';
import Spinner from '../../shared/Spinner';

const Discussions: React.FC = () => {
    const router = useRouter();
    const { setDiscussionsData, discussionsData, setDiscussionData, currentUser } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);

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

    const handleSubmit = async (newDiscussion: Discussion & {price: number}) => {
        try {
            if (currentUser) {
                const { price, ...discussion } = newDiscussion
                await createDiscussion(discussion, currentUser?.id, `Let's discuss topic:  ${newDiscussion.topic}`, price);
                updateDiscussions()
            }

        } catch (error) {
            console.error('Error creating discussion:', error);
        }
    };
    const updateDiscussions = () => {
        getDiscussions().then((data) => {

            setDiscussionsData([...discussionsData, ...data])
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4 text-white">Discussions</h1>
                <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create new discussion
                </button>
                {
                    isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Discussion" /> :
                        (discussionsData.length === 0 ? <Spinner /> : <Table
                            data={discussionsData}
                            onBuyClick={handleDiscussionClick}
                            buttonLabel="Join"
                        />)
                }
            </div>
        </div>
    );
};

export default Discussions;