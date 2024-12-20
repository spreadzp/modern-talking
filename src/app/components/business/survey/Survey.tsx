
import React, { useEffect } from 'react';
import Chat from '../../common/Chat/Chat';
import Content from '../../common/Content';
import ExpandableContent from '../../shared/ExpandableTable';
import { usePathname } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import Spinner from '../../shared/Spinner';
import { getSurveyByHash } from '@/server/survey';
import LoginPage from '@/app/login/LoginPage';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';



const Survey: React.FC = () => {
    const pathname = usePathname()
    const { surveyData, setSurveyData } = useSiteStore()
    const { activeAccount } = useKeylessAccounts();
    useEffect(() => {
        const parsedHash = pathname.split('/')[2];
        if (parsedHash !== '') {
            getSurveyByHash(parsedHash).then((data: any) => {
                if (data) {
                    setSurveyData(data)
                }
            })
        }

    }, [setSurveyData, pathname]);
    if (!activeAccount) return <LoginPage />
    return (
        <>
            <div className="min-h-screen ">
                {!surveyData.title ? <Spinner /> : <div className="container mx-auto flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500">
                        <Content contentData={surveyData} />
                    </div>
                    <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                        <Chat contentData={surveyData} />
                    </div>
                </div>}
            </div >
        </>
    );
};

export default Survey;