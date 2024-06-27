'use client'
import React, { useEffect, useState } from 'react';
import Table from './Table'; 
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../hooks/store';
import { createDiscussion, getDiscussions } from '@/server/discussion-db';
import { Modal } from './Modal';
import { Discussion } from '@prisma/client';
import Spinner from './Spinner';

const Discussions: React.FC = () => {
    const router = useRouter();
    const { setDiscussionsData, discussionsData, setDiscussionData, currentUser } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {
        if (discussionsData.length === 0) { // TODO
            updateDiscussions()
        }
    }, [discussionsData,  setDiscussionsData, setDiscussionData, currentUser  ]);
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

    const handleSubmit = async (newDiscussion: Discussion) => {
        try {
            if(currentUser) {
                const createdDiscussion = await createDiscussion(newDiscussion, currentUser?.id, `Let's discuss topic:  ${newDiscussion.topic}`);
                console.log('Discussion created:', createdDiscussion);
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
                    isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} nameSubmit="Create Discussion"  /> :
                        (discussionsData.length === 0 ? <Spinner /> : <Table
                            data={discussionsData}
                            onBuyClick={handleDiscussionClick}
                            buttonLabel="Join"
                        /> ) 
                }
            </div>
        </div>
    );
};

export default Discussions;