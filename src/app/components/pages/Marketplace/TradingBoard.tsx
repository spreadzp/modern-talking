import React, { useState, useEffect } from 'react';
import ChangeBidModal from './ChangeBidModal';
import AcceptBidModal from './AcceptBidModal';
import { createBid } from '@/server/bid';
import { Bid } from '@prisma/client';

interface LotData {
    hashResource: string;
    askPrice: number;
    sellerAddress: string;
    bids: Bid[];
    historyTrades: HistoryTrade[];
}

export interface BidData {
    price: number;
    address: string;
}

interface HistoryTrade {
    price: number;
    address: string;
    date: string;
}

const TradingBoard: React.FC<{ hashResource: string }> = ({ hashResource }) => {
    const [lotData, setLotData] = useState<LotData>({
        hashResource: '',
        askPrice: 0,
        sellerAddress: '',
        bids: [],
        historyTrades: []
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [showChangeBidModal, setShowChangeBidModal] = useState<boolean>(false);
    const [showAcceptBidModal, setShowAcceptBidModal] = useState<boolean>(false);
    const [selectedBid, setSelectedBid] = useState<BidData | null>(null);
    const [newBidPrice, setNewBidPrice] = useState<number>(0);
    const [newBidAddress, setNewBidAddress] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Mock data for demonstration
                const mockResponse: LotData = {
                    hashResource: 'mockHash',
                    askPrice: 100,
                    sellerAddress: '0x12345',
                    bids: [
                        { price: 95, address: '0x54321' },
                        { price: 97, address: '0x67890' }
                    ],
                    historyTrades: [
                        { price: 100, address: '0x11111', date: '2023-04-01T12:00:00Z' },
                        { price: 98, address: '0x22222', date: '2023-03-31T12:00:00Z' }
                    ]
                };
                setLotData(mockResponse);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hashResource]);

    const handleAccept = (bid: BidData) => {
        setSelectedBid(bid);
        setShowAcceptBidModal(true);
    };

    const handleAcceptBid = () => {
        if (selectedBid) {
            console.log('Bid accepted:', selectedBid);
            // Perform the necessary actions to accept the bid
        }
        setShowAcceptBidModal(false);
    };

    const handleChangeBid = (bid: BidData) => {
        setSelectedBid(bid);
        setShowChangeBidModal(true);
    };

    const handleSaveNewPrice = (newPrice: number) => {
        if (selectedBid) {
            const updatedBids = lotData.bids.map(bid =>
                bid.address === selectedBid.address ? { ...bid, price: newPrice } : bid
            );
            setLotData({ ...lotData, bids: updatedBids });
        }
        setShowChangeBidModal(false);
    };

    const handleRemoveBid = () => {
        if (selectedBid) {
            const updatedBids = lotData.bids.filter(bid => bid.address !== selectedBid.address);
            setLotData({ ...lotData, bids: updatedBids });
        }
        setShowChangeBidModal(false);
    };

    const handleCreateNewBid = async () => {
        const newBid: BidData= {
            price:  newBidPrice , // Convert to bigint for Prisma typeBidPrice,
            address: newBidAddress,
        };

        try {
            const createdBid = await createBid(newBid,  1); 
            setLotData({ ...lotData, bids: [...lotData.bids, createdBid] });
        } catch (err) {
            setError(err as Error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Trading Board</h1>
                <div className="mb-4">
                    <strong>Lot Hash:</strong> {lotData.hashResource}
                </div>
                <div className="mb-4">
                    <strong>Ask Price:</strong> {lotData.askPrice}
                </div>
                <div className="mb-4">
                    <strong>Seller Address:</strong> {lotData.sellerAddress}
                </div>

                <h2 className="text-xl font-bold mb-2">Bids</h2>
                <table className="table-auto w-full text-white">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Bid Price</th>
                            <th className="border px-4 py-2">Address</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lotData.bids.map((bid, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center align-middle">{bid.price}</td>
                                <td className="border px-4 py-2 text-center align-middle">{bid.address}</td>
                                <td className="border px-4 py-2 text-center align-middle">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={() => handleAccept(bid)}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleChangeBid(bid)}
                                    >
                                        Change Bid
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4">
                    <input
                        type="number"
                        placeholder="New Bid Price"
                        value={newBidPrice}
                        onChange={(e) => setNewBidPrice(Number(e.target.value))}
                        className="border px-4 py-2 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="New Bid Address"
                        value={newBidAddress}
                        onChange={(e) => setNewBidAddress(e.target.value)}
                        className="border px-4 py-2 mr-2"
                    />
                    <button
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCreateNewBid}
                    >
                        Create New Bid
                    </button>
                </div>

                <h2 className="text-xl font-bold mb-2 mt-4">History Trades</h2>
                <table className="table-auto w-full text-white">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Address</th>
                            <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lotData.historyTrades.map((trade, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 text-center align-middle">{trade.price}</td>
                                <td className="border px-4 py-2 text-center align-middle">{trade.address}</td>
                                <td className="border px-4 py-2 text-center align-middle">{new Date(trade.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showChangeBidModal && (
                    <ChangeBidModal
                        bid={selectedBid}
                        onClose={() => setShowChangeBidModal(false)}
                        onSave={handleSaveNewPrice}
                        onRemove={handleRemoveBid}
                    />
                )}
                {showAcceptBidModal && (
                    <AcceptBidModal
                        bid={selectedBid}
                        askPrice={lotData.askPrice}
                        onClose={() => setShowAcceptBidModal(false)}
                        onAccept={handleAcceptBid}
                    />
                )}
            </div>
        </div>
    );
};

export default TradingBoard;