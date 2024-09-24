// Marketplace.tsx
import { getBidList } from '@/server/bid';
import { getHistoryList } from '@/server/history';
import { getMarketplaceList } from '@/server/marketplace';
import React, { useState, useEffect } from 'react';
import Spinner from '../../shared/Spinner';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';
import Title, { TitleEffect, TitleSize } from '../../shared/Title';
import ExpandableContent from '../../shared/ExpandableTable';

const Marketplace: React.FC = () => {
    const [marketplaceData, setMarketplaceData] = useState<any[]>([]);
    const [bidData, setBidData] = useState<any[]>([]);
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const marketplaceList = await getMarketplaceList();
            const bidList = await getBidList();
            const historyList = await getHistoryList();

            setMarketplaceData(marketplaceList);
            setBidData(bidList);
            setHistoryData(historyList);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleClick = (marketplaceData: any) => {
        let path = ``;
        if (marketplaceData.typeLot === 'Discussion') {
            path = `discussion`;
        }
        if (marketplaceData.typeLot === 'Voting') {
            path = `voting`;
        }
        if (marketplaceData.typeLot === 'DataSet') {
            path = `data-set`;
        }
        if (marketplaceData.typeLot === 'Survey') {
            path = `survey`;
        }
        if (path === "") return;
        router?.push(`/${path}/${marketplaceData.hashResource}`);
    };

    const handleTradeClick = (marketplaceData: any) => {
        router?.push(`/trading-board/${marketplaceData.hashResource}-${marketplaceData.typeLot}`);
    };

    return (
        <>
            <div className="">
                <div className="container mx-auto p-4 ">
                    <div className="flex items-center justify-center"><Title
                        titleName="Marketplace"
                        titleSize={TitleSize.H3}
                        titleEffect={TitleEffect.Gradient}
                    /></div>


                    <div className="mb-8">

                        <ExpandableContent title={`Lots for sale`} isOpenContent={false}>
                            {loading ? <Spinner text='Loading lots for sale' /> : marketplaceData.length === 0 ? <p>No lots available.</p> : <Table data={marketplaceData} onTradeClick={handleTradeClick} />}
                        </ExpandableContent>


                    </div>
                    <div className="mb-8">

                        <ExpandableContent title={`Discussions`} isOpenContent={false}>
                            {loading ? <Spinner text='Loading discussions' /> : marketplaceData.filter(item => item.typeLot === 'Discussion').length === 0 ? <p>No discussions available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'Discussion')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                        </ExpandableContent>
                    </div>
                    <div className="mb-8">

                        <ExpandableContent title={`Surveys`} isOpenContent={false}>
                            {loading ? <Spinner text='Loading surveys' /> : marketplaceData.filter(item => item.typeLot === 'Survey').length === 0 ? <p>No surveys available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'Survey')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                        </ExpandableContent>
                    </div>
                    <div className="mb-8">

                        <ExpandableContent title={`Voting Lists`} isOpenContent={false}>
                            {loading ? <Spinner text='Loading voting lists' /> : marketplaceData.filter(item => item.typeLot === 'Voting').length === 0 ? <p>No voting lists available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'Voting')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                        </ExpandableContent>
                    </div>
                    <div className="mb-8">

                        <ExpandableContent title={`Data Sets`} isOpenContent={false}>
                            {loading ? <Spinner text='Loading data sets' /> : marketplaceData.filter(item => item.typeLot === 'DataSet').length === 0 ? <p>No data sets available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'DataSet')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                        </ExpandableContent>
                    </div>
                    {/* <div className="mb-8">
                        <Title
                            titleName="Bids"
                            titleSize={TitleSize.H4}
                            titleEffect={TitleEffect.Gradient}
                        />
                        {bidData.length === 0 ? <p>No bids available.</p> : <Table data={bidData} onTradeClick={handleTradeClick} />}
                    </div> */}
                    <div className="mb-8">

                        <ExpandableContent title={`History`} isOpenContent={false}>
                            {historyData.length === 0 ? <p>No history available.</p> : <Table data={historyData} onTradeClick={handleTradeClick} />}
                        </ExpandableContent>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Marketplace;