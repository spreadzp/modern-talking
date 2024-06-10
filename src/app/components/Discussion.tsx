// src/components/Discussion.tsx
import React from 'react';
import { DiscussionData } from '../interfaces/table.interfaces';
import Chat from './Chat';
import Content from './Content';
import ExpandableContent from './ExpandableTable';

interface DiscussionProps {
    discussion: DiscussionData;
}

const DiscussionComponent: React.FC<DiscussionProps> = ({ discussion }) => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6] p-4">
            <div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                    <ExpandableContent title={`Content block: ${discussion.title}`} isOpenContent={true}>
                        <Content discussion={discussion} />
                    </ExpandableContent>
                </div>
                <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                    <ExpandableContent title={`Chat block: ${discussion.title}`} isOpenContent={true}>
                        <Chat discussion={discussion} />
                    </ExpandableContent>
                </div>
            </div>
        </div>
    );
};

export default DiscussionComponent;