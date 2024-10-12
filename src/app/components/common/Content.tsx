'use client'
import React, { useEffect } from 'react';
import { ContentData } from '../../interfaces/table.interfaces';
import Rewards from '../business/rewards/Rewards';
import MarketData from '../shared/MarketData';
import { useSiteStore } from '@/app/hooks/store';
import OwnerPanel from '../shared/OwnerPanel';

interface LeftSideProps {
    contentData: ContentData;
}

const Content: React.FC<LeftSideProps> = ({ contentData }) => {
    const { setSelectedOwnerAddress, setCurrentResourceType } = useSiteStore();
    useEffect(() => {
        setSelectedOwnerAddress(contentData.owner?.address)
        setCurrentResourceType(contentData?.resourceType)
    }, [contentData, setSelectedOwnerAddress, setCurrentResourceType])
    return (
        <div className="w-full md:pl-4 md:mr-4 flex flex-col text-yellow-500">
            {contentData.listingStatus === 'Listed' && < MarketData hash={contentData.hash} />}
            {contentData.owner &&
                <OwnerPanel />}
            <div className="mb-2">
                Source:{' '}
                <a
                    href={contentData.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    {contentData.title}
                </a>
            </div>
            <iframe
                src={contentData.sourceUrl}
                width="100%"
                height="300"
                allowFullScreen
                title="YouTube Video"
                className="mb-2"
            />
            <div className="mb-2">
                <strong>Description:</strong> {contentData.description}
            </div>
            <div className="mb-2">
                <strong>Prompt Restrictions:</strong> {contentData.promptRestrictions}
            </div>
            <div className="mb-2">
                <Rewards contentData={contentData} />
            </div>
        </div>

    );
};

export default Content;