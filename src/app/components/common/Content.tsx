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
    const {setSelectedOwnerAddress, setCurrentResourceType}  = useSiteStore();
    useEffect(() => {
        setSelectedOwnerAddress(contentData.owner?.address)
        setCurrentResourceType(contentData?.resourceType)
    }, [contentData, setSelectedOwnerAddress, setCurrentResourceType])
    return (
        <div className="w-full md:pl-4 md:mr-4 flex flex-col "> 
            <MarketData hash={contentData.hash} /> 
            {contentData.owner && 
                    <OwnerPanel  /> }
            <p className="mb-2">
                Source:{' '}
                <a
                    href={contentData.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    {contentData.title}
                </a>
            </p>
            <iframe
                src={contentData.sourceUrl}
                width="100%"
                height="300" 
                allowFullScreen
                title="YouTube Video"
                className="mb-2"
            />
            <p className="mb-2">
                <strong>Description:</strong> {contentData.description}
            </p>
            <p className="mb-2">
                <strong>Prompt Restrictions:</strong> {contentData.promptRestrictions}
            </p>
            <p className="mb-2">
            <Rewards contentData={contentData}/>
            </p>
        </div>

    );
};

export default Content;