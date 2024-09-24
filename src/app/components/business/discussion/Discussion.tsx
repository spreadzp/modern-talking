// src/components/Discussion.tsx
import React, { useEffect } from 'react';
import Chat from '../../common/Chat/Chat';
import Content from '../../common/Content';
import ExpandableContent from '../../shared/ExpandableTable';
import { getDiscussionByHash } from '@/server/discussion-db';
import { useSiteStore } from '../../../hooks/store';
import { usePathname } from 'next/navigation';
import Spinner from '../../shared/Spinner';
import LoginPage from '@/app/login/LoginPage';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';

const DiscussionComponent: React.FC = () => {
    const pathname = usePathname()
    const { discussionData, setDiscussionData } = useSiteStore()
    const { activeAccount } = useKeylessAccounts();
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
    if (!activeAccount) return <LoginPage />
    return (
        <>
            <div className="min-h-screen ">
                {!discussionData.title ? <Spinner /> : <div className="container mx-auto flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                        <ExpandableContent
                            title={`Content block: ${discussionData.title}`}
                            isOpenContent={true}
                        >
                            <Content contentData={discussionData} />
                        </ExpandableContent>
                    </div>
                    <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                        <ExpandableContent
                            title={`Chat block: ${discussionData.title}`}
                            isOpenContent={true}
                        >
                            <Chat contentData={discussionData} />
                        </ExpandableContent>
                    </div>
                </div>}
            </div>
        </>
    );
};

export default DiscussionComponent;