import React, { useEffect, useState } from 'react';
import ExpandableContent from '../../shared/ExpandableTable';
import { getDiscussionByHash } from '@/server/discussion-db';
import { useSiteStore } from '../../../hooks/store';
import { usePathname } from 'next/navigation';
import Spinner from '../../shared/Spinner';
import TradingBoard from './trading/TradingBoard';
import Content from '../../common/Content';
import StarryBackground from '../../shared/StarryBackground';
import { LotType } from '@prisma/client';
import { getVotingByHash } from '@/server/voting';
import { getSurveyByHash } from '@/server/survey';
import { getDataSetByHash } from '@/server/dataset';

const Board: React.FC = () => {
    const pathname = usePathname() 
    const [contentData, setContentData] = useState({} as any)
    const [resourceType, setResourceType] = useState('Discussion')
    const [hash, setHash] = useState('')
    useEffect(() => {
        const contentInfo = pathname.split('/')[2];
        const parsedHash = contentInfo.split('-')[0];
        setResourceType(contentInfo.split('-')[1]); //  
        if (parsedHash !== '') {
            setHash(parsedHash) 
            if(resourceType ===  LotType.Discussion) {
                getDiscussionByHash(parsedHash).then((data: any) => { // TODO
                    if (data) {
                        setContentData(data)
                    }
                })
            } 
            if(resourceType === LotType.Voting) {
                getVotingByHash(parsedHash).then((data: any) => { // TODO
                    if (data) {
                        setContentData(data)
                    }
                })
            }
            if(resourceType === LotType.Survey) {
                getSurveyByHash(parsedHash).then((data: any) => { // TODO
                    if (data) {
                        setContentData(data)
                    }
                })
            }
            if(resourceType === LotType.DataSet) {
                getDataSetByHash(parsedHash).then((data: any) => { // TODO
                    if (data) {
                        setContentData(data)
                    }
                })
            }
        }

    }, [setContentData, pathname, resourceType, hash]);

    return (
        <>
        <StarryBackground />
        <div className="min-h-screen ">
            {!contentData.title ? <Spinner /> : <div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                    <ExpandableContent title={`Content block: ${contentData.title}`} isOpenContent={true}>
                        <Content contentData={contentData} />
                    </ExpandableContent>
                </div>
                <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                    <ExpandableContent title={`Chat block: ${contentData.title}`} isOpenContent={true}>
                        <TradingBoard hashResource={hash} />
                    </ExpandableContent>
                </div>
            </div>}
        </div>
        </>
    );
};

export default Board;