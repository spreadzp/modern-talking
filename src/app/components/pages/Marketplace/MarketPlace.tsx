// Marketplace.tsx
import { getBidList } from '@/server/bid';
import { getHistoryList } from '@/server/history';
import { getMarketplaceList } from '@/server/marketplace';
import React, { useState, useEffect } from 'react';
import Spinner from '../../shared/Spinner';
import Table from '../../shared/Table';
import { useRouter } from 'next/navigation';

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
        router?.push(`/trading-board/${marketplaceData.hashResource}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Lots for Sale</h2>
                    {loading ? <Spinner /> : marketplaceData.length === 0 ? <p>No lots available.</p> : <Table data={marketplaceData} onTradeClick={handleTradeClick} />}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Discussions</h2>
                    {loading ? <Spinner /> : marketplaceData.filter(item => item.typeLot === 'Discussion').length === 0 ? <p>No discussions available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'Discussion')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Surveys</h2>
                    {loading ? <Spinner /> : marketplaceData.filter(item => item.typeLot === 'Survey').length === 0 ? <p>No surveys available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'Survey')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Voting Lists</h2>
                    {loading ? <Spinner /> : marketplaceData.filter(item => item.typeLot === 'Voting').length === 0 ? <p>No voting lists available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'Voting')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Data Sets</h2>
                    {loading ? <Spinner /> : marketplaceData.filter(item => item.typeLot === 'DataSet').length === 0 ? <p>No data sets available.</p> : <Table data={marketplaceData.filter(item => item.typeLot === 'DataSet')} onBuyClick={handleClick} onTradeClick={handleTradeClick} buttonLabel="Join" />}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Bids</h2>
                    {bidData.length === 0 ? <p>No bids available.</p> : <Table data={bidData} onTradeClick={handleTradeClick} />}
                </div>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">History</h2>
                    {historyData.length === 0 ? <p>No history available.</p> : <Table data={historyData} onTradeClick={handleTradeClick} />}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;