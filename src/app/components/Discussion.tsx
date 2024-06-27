// src/components/Discussion.tsx
import React, { useEffect, useState } from 'react';
import { DiscussionData } from '../interfaces/table.interfaces';
import Chat from './Chat';
import Content from './Content';
import ExpandableContent from './ExpandableTable';
import { getDiscussionByHash } from '@/server/discussion-db';
import { useSiteStore } from '../hooks/store';
import { usePathname } from 'next/navigation';
import Spinner from './Spinner';

 

const DiscussionComponent: React.FC = () => {
    const pathname = usePathname()
    const { discussionData, setDiscussionData } = useSiteStore() 
    useEffect(() => {
        const parsedHash = pathname.split('/')[2]; 
        if (parsedHash !== '') {
            getDiscussionByHash(parsedHash).then((data: any) => { 
                if (data) {
                    setDiscussionData(data)
                }
            })
        } 

    }, [setDiscussionData, pathname]); 

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6] p-4">
            {!discussionData.title ? <Spinner /> : <div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                    <ExpandableContent title={`Content block: ${discussionData.title}`} isOpenContent={true}>
                        <Content contentData={discussionData} />
                    </ExpandableContent>
                </div>
                <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                    <ExpandableContent title={`Chat block: ${discussionData.title}`} isOpenContent={true}>
                        <Chat contentData={discussionData} />
                    </ExpandableContent>
                </div>
            </div>}
        </div>
    );
};

export default DiscussionComponent;