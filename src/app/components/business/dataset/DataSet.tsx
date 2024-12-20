
import React, { useEffect } from 'react';
import Chat from '../../common/Chat/Chat';
import Content from '../../common/Content';
import ExpandableContent from '../../shared/ExpandableTable';
import { usePathname } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import Spinner from '../../shared/Spinner';
import { getDataSetByHash } from '@/server/dataset';
import LoginPage from '@/app/login/LoginPage';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';



const DataSetComponent: React.FC = () => {
    const pathname = usePathname()
    const { dataSet, setDataSet } = useSiteStore()
    const { activeAccount } = useKeylessAccounts();

    useEffect(() => {
        const parsedHash = pathname.split('/')[2];
        if (parsedHash !== '') {
            getDataSetByHash(parsedHash).then((data: any) => {
                if (data) {
                    setDataSet(data)
                }
            })
        }

    }, [setDataSet, pathname]);
    if (!activeAccount) return <LoginPage />
    return (
        <>
            <div className="min-h-screen ">
                {!dataSet.title ? <Spinner /> : <div className="container mx-auto flex flex-col  shadow-lg rounded-lg md:flex-row h-full">
                    <div className="md:w-1/2 md:pr-4 md:mb-4 md:mb-0 md:ml-4 overflow-y-auto p-4 border-2 border-dotted border-gray-500 text-yellow-500 ">

                        <Content contentData={dataSet} />
                    </div>
                    <div className="md:w-1/2 md:pl-4 md:mr-4 flex flex-col border-2 border-dotted border-gray-500 p-4">
                        <Chat contentData={dataSet} />
                    </div>
                </div>}
            </div>
        </>
    );
};

export default DataSetComponent;