
import React, { useEffect } from 'react'; 
import Chat from '../../common/Chat/Chat';
import Content from '../../common/Content';
import ExpandableContent from '../../shared/ExpandableTable';
import { usePathname } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import Spinner from '../../shared/Spinner'; 
import { getVotingByHash } from '@/server/voting';

 

const Voting: React.FC = ( ) => {
    const pathname = usePathname() 
    const {votingData, setVotingData } = useSiteStore()
    useEffect(() => {
        const parsedHash = pathname.split('/')[2]; 
        if (parsedHash !== '') {
            getVotingByHash(parsedHash).then((data: any) => { 
                if (data) {
                    setVotingData(data)
                }
            })
        } 

    }, [ setVotingData,  pathname]); 
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6] p-4">
            {!votingData.title ? <Spinner /> :<div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                    <ExpandableContent title={`Content block: ${votingData.title}`} isOpenContent={true}>
                        <Content contentData={votingData} />
                    </ExpandableContent>
                </div>
                <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                    <ExpandableContent title={`Chat block: ${votingData.title}`} isOpenContent={true}>
                        <Chat contentData={votingData} />
                    </ExpandableContent>
                </div>
            </div>}
        </div>
    );
};

export default Voting;