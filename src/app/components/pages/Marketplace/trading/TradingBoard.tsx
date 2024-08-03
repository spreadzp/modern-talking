import React, { useState, useEffect } from 'react';
import { useSiteStore } from '@/app/hooks/store';
import { getMarketplaceByHash } from '@/server/marketplace'; 
import { Bid, User } from '@prisma/client';
import StarryBackground from '@/app/components/shared/StarryBackground';
import LotInfo from './LotInfo';
import BidTable from './BidTable';
import HistoryTradeTable from './HistoryTradeTable';
import BidForm from './BidForm';
import ChangeBidModal from '../ChangeBidModal';
import AcceptBidModal from '../AcceptBidModal';
import { createBid } from '@/server/bid';
import { BidData, LotData } from './trade.interfaces';
import Spinner from '@/app/components/shared/Spinner';

const TradingBoard: React.FC<{ hashResource: string }> = ({ hashResource }) => {
    const { selectedOwnerAddress, userAddressWallet } = useSiteStore();
    const [lotData, setLotData] = useState<LotData>({
        id: 0,
        hashResource: '',
        price: 0,
        sellerAddress: '',
        bids: [],
        historyTrades: []
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [showChangeBidModal, setShowChangeBidModal] = useState<boolean>(false);
    const [showAcceptBidModal, setShowAcceptBidModal] = useState<boolean>(false);
    const [selectedBid, setSelectedBid] = useState<Bid & { owner: User } | null>(null);
    const [newBidPrice, setNewBidPrice] = useState<number>(0);
    const [showAccept, setShowAccept] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lot = await getMarketplaceByHash(hashResource);
                setLotData(lot);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        if (selectedOwnerAddress && userAddressWallet) {
            console.log("🚀 ~ useEffect ~ userAddressWallet:", userAddressWallet)
            console.log("🚀 ~ useEffect ~ selectedOwnerAddress:", selectedOwnerAddress)
            setShowAccept(selectedOwnerAddress === userAddressWallet)
        }
        fetchData();
    }, [hashResource, setShowAcceptBidModal, selectedOwnerAddress, userAddressWallet]);

    const handleAccept = (bid: Bid & { owner: User }) => {
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

    const handleChangeBid = (bid: Bid & { owner: User }) => {
        setSelectedBid(bid);
        setShowChangeBidModal(true);
    };

    const handleSaveNewPrice = (newPrice: number) => {
        if (selectedBid) {
            const updatedBids = lotData.bids.map(bid =>
                bid.id === selectedBid.id ? { ...bid, price: BigInt(newPrice) } : bid
            );
            setLotData({ ...lotData, bids: updatedBids });
        }
        setShowChangeBidModal(false);
    };

    const handleRemoveBid = () => {
        if (selectedBid) {
            const updatedBids = lotData.bids.filter(bid => bid.id !== selectedBid.id);
            setLotData({ ...lotData, bids: updatedBids });
        }
        setShowChangeBidModal(false);
    };

    const handleCreateNewBid = async () => {
        const newBid: BidData = {
            price: newBidPrice,
            address: userAddressWallet,
        };

        try {
            const createdBid = await createBid(newBid, lotData.id);
            setLotData({ ...lotData, bids: [...lotData.bids, createdBid] });
        } catch (err) {
            setError(err as Error);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Trading Board</h1>
                    <LotInfo lotData={lotData} />
                    <BidTable
                        bids={lotData.bids}
                        userAddressWallet={userAddressWallet}
                        showAccept={showAccept}
                        onAccept={handleAccept}
                        onChangeBid={handleChangeBid}
                    />
                    <BidForm
                        newBidPrice={newBidPrice}
                        onNewBidPriceChange={setNewBidPrice}
                        onCreateNewBid={handleCreateNewBid}
                    />
                    {lotData.historyTrades?.length > 0 && <HistoryTradeTable historyTrades={lotData.historyTrades} />}
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
                            bid={selectedBid ? { price: Number(selectedBid.price), address: selectedBid.owner.address } : null}
                            askPrice={lotData.price}
                            onClose={() => setShowAcceptBidModal(false)}
                            onAccept={handleAcceptBid}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default TradingBoard;