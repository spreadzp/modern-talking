import React, { useEffect, useState } from 'react';
import ExpandableContent from '../../shared/ExpandableTable';
import { getDiscussionByHash } from '@/server/discussion-db';
import { useSiteStore } from '../../../hooks/store';
import { usePathname } from 'next/navigation';
import Spinner from '../../shared/Spinner';
import TradingBoard from './TradingBoard';
import Content from '../../common/Content';
import StarryBackground from '../../shared/StarryBackground';

const Board: React.FC = () => {
    const pathname = usePathname()
    const { discussionData, setDiscussionData } = useSiteStore()
    const [hash, setHash] = useState('')
    useEffect(() => {
        const parsedHash = pathname.split('/')[2];
        if (parsedHash !== '') {
            setHash(parsedHash)
            getDiscussionByHash(parsedHash).then((data: any) => { // TODO
                if (data) {
                    setDiscussionData(data)
                }
            })
        }

    }, [setDiscussionData, pathname]);

    return (
        <>
        <StarryBackground />
        <div className="min-h-screen ">
            {!discussionData.title ? <Spinner /> : <div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                    <ExpandableContent title={`Content block: ${discussionData.title}`} isOpenContent={true}>
                        <Content contentData={discussionData} />
                    </ExpandableContent>
                </div>
                <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                    <ExpandableContent title={`Chat block: ${discussionData.title}`} isOpenContent={true}>
                        <TradingBoard hashResource={hash} />
                    </ExpandableContent>
                </div>
            </div>}
        </div>
        </>
    );
};

export default Board;