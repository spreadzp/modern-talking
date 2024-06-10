'use client'
import React, { useEffect, useState } from 'react';
import Table from './Table';
import { DiscussionData } from '../interfaces/table.interfaces';
import { useRouter } from 'next/navigation';
import { useSiteStore } from '../hooks/store';
import { createDiscussion, getDiscussions } from '@/server/discussion-db';
import { Modal } from './Modal';
import { Discussion } from '@prisma/client';
 
const Discussions: React.FC = () => {
    const router = useRouter();
    const { setDiscussionsData, discussionsData } = useSiteStore()
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if (discussionsData.length === 0) { // TODO
            getDiscussions().then((data) => {
                const preparedData: DiscussionData[] = data.map((discussion) => {
                    return {
                        hash: discussion.hash,
                        sourceUrl: discussion.sourceUrl,
                        title: discussion.topic,
                        description: discussion.description,
                        promptRestrictions: discussion.prompt,
                        rewards: discussion.rewards,
                        topic: discussion.topic,
                        chat: discussion?.chat ? discussion.chat : undefined,
                    }
                })
                console.log("🚀 ~ constpreparedData:DiscussionData[]=data.map ~ preparedData:", preparedData)
                setDiscussionsData([...discussionsData, ...preparedData])
            })
        }
    }, []);
    const handleDiscussionClick = (discussion: DiscussionData) => {
        // Navigate to the discussion page with the hash as the dynamic segment
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
            const createdDiscussion = await createDiscussion(newDiscussion, 1, 'Hello this greeting message');
            console.log('Discussion created:', createdDiscussion);
            // Optionally, update the discussionsData state here
        } catch (error) {
            console.error('Error creating discussion:', error);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4 text-white">Discussions</h1>
                <button onClick={openModal} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create new discussion
                </button>
                {isModalOpen ? <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} /> :
                    <Table
                        data={discussionsData}
                        onBuyClick={handleDiscussionClick}
                        buttonLabel="Join"
                    />
                }
            </div>
        </div>
    );
};

export default Discussions;