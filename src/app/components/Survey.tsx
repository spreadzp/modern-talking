
import React, { useEffect } from 'react'; 
import Chat from './Chat';
import Content from './Content';
import ExpandableContent from './ExpandableTable';
import { usePathname } from 'next/navigation';
import { useSiteStore } from '../hooks/store';
import Spinner from './Spinner';
import { getSurveyByHash } from '@/server/survey';

 

const Survey: React.FC = ( ) => {
    const pathname = usePathname() 
    const {surveyData, setSurveyData } = useSiteStore()
    useEffect(() => {
        const parsedHash = pathname.split('/')[2]; 
        if (parsedHash !== '') {
            getSurveyByHash(parsedHash).then((data: any) => { 
                if (data) {
                    setSurveyData(data)
                }
            })
        } 

    }, [ setSurveyData,  pathname]); 
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6] p-4">
            {!surveyData.title ? <Spinner /> :<div className="container mx-auto flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                    <ExpandableContent title={`Content block: ${surveyData.title}`} isOpenContent={true}>
                        <Content contentData={surveyData} />
                    </ExpandableContent>
                </div>
                <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                    <ExpandableContent title={`Chat block: ${surveyData.title}`} isOpenContent={true}>
                        <Chat contentData={surveyData} />
                    </ExpandableContent>
                </div>
            </div>}
        </div>
    );
};

export default Survey;