// src/components/LeftSide.tsx
import React from 'react';
import { DiscussionData } from '../interfaces/table.interfaces';

interface LeftSideProps {
    discussion: DiscussionData;
}

const Content: React.FC<LeftSideProps> = ({ discussion }) => {
    console.log("🚀 ~ discussion:", discussion)
    return (
        <div className="w-full md:pl-4 md:mr-4 flex flex-col ">
            <h2 className="text-lg font-semibold mb-2">{discussion.title}</h2>
            <p className="mb-2">
                Source:{' '}
                <a
                    href={discussion.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    {discussion.title}
                </a>
            </p>
            <iframe
                src={discussion.sourceUrl}
                width="100%"
                height="300" 
                allowFullScreen
                title="YouTube Video"
                className="mb-2"
            />
            <p className="mb-2">
                <strong>Description:</strong> {discussion.description}
            </p>
            <p className="mb-2">
                <strong>Prompt Restrictions:</strong> {discussion.promptRestrictions}
            </p>
            <p className="mb-2">
                <strong>Rewards:</strong> {discussion?.rewards?.length}
            </p>
        </div>

    );
};

export default Content;