
import React, { useEffect } from 'react'; 
import Chat from '../../common/Chat/Chat';
import Content from '../../common/Content';
import ExpandableContent from '../../shared/ExpandableTable';
import { usePathname } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import Spinner from '../../shared/Spinner';
import { getSurveyByHash } from '@/server/survey';
import StarryBackground from '../../shared/StarryBackground';

 

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
        <>
        <StarryBackground />
        <div className="min-h-screen ">
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
        </>
    );
};

export default Survey;