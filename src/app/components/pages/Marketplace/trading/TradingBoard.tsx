import React, { useState, useEffect, useCallback } from 'react';
import { useSiteStore } from '@/app/hooks/store';
import { getMarketplaceByHash } from '@/server/marketplace';
import { Bid, User } from '@prisma/client';
import StarryBackground from '@/app/components/shared/StarryBackground';

import BidTable from './BidTable';
import HistoryTradeTable from './HistoryTradeTable';
import BidForm from './BidForm';
import ChangeBidModal from '../ChangeBidModal';
import AcceptBidModal from '../AcceptBidModal';
import { createBid, removeBidByOwnerId, updateBidPrice } from '@/server/bid';
import { BidData, LotData } from './trade.interfaces';
import Spinner from '@/app/components/shared/Spinner';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';

import { getListingObjectPrice, purchase } from '@/lib/web3/aptos/marketplace';
import { useRouter } from 'next/navigation';
import AskTable from './AskTable';
import Title, { TitleEffect, TitleSize } from '@/app/components/shared/Title';
import ErrorModal from '@/app/components/shared/ErrorModal';
import { getNftIdByHash } from '@/lib/web3/aptos/nft';
import { fundTestAptAccount } from '@/lib/web3/aptos/provider';


const TradingBoard: React.FC<{ hashResource: string }> = ({ hashResource }) => {
    const { activeAccount, disconnectKeylessAccount, accounts } = useKeylessAccounts();
    const { selectedOwnerAddress, userAddressWallet, coin } = useSiteStore();
    const router = useRouter();
    const [lotData, setLotData] = useState<LotData>({
        id: 0,
        hashResource: '',
        price: 0,
        sellerAddress: '',
        hashLot: '',
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (activeAccount) {
                    let lot = await getMarketplaceByHash(hashResource);
                    debugger
                    lot.price = Number(lot.price) / 10 ** coin.decimals
                    const resp = await getListingObjectPrice(lot.hashLot);

                    setLotData(lot);
                    if (resp) {
                        console.log("getListingObjectPrice", resp);
                        const price = resp;
                        console.log("🚀 ~ .then ~ price:", price);
                        lot.price = price / 10 ** coin.decimals;
                        setLotData(lot);
                    }
                } else {
                    setError(new Error('No active account'));
                    router?.push(`/`);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedOwnerAddress && activeAccount) {
            setShowAccept(selectedOwnerAddress === activeAccount?.accountAddress.toString());
        } else {
            setShowAccept(false);
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

    const handleSaveNewPrice = useCallback(async (newPrice: number) => {
        if (!selectedBid) return;

        const priceInDecimals = newPrice * 10 ** coin.decimals;
        await updateBidPrice(selectedBid.id, priceInDecimals);
        setLotData(prev => ({
            ...prev,
            bids: prev.bids.map(bid => (bid.id === selectedBid.id ? { ...bid, price: BigInt(priceInDecimals) } : bid))
        }));

        setShowChangeBidModal(false);
    }, [selectedBid, coin.decimals]);

    const handleRemoveBid = useCallback(async () => {
        if (!selectedBid) return;

        await removeBidByOwnerId(selectedBid.id, selectedBid.bidOwner);
        setLotData(prev => ({
            ...prev,
            bids: prev.bids.filter(bid => bid.id !== selectedBid.id)
        }));

        setShowChangeBidModal(false);
    }, [selectedBid]);

    const handleCreateNewBid = useCallback(async () => {
        const priceInDecimals = newBidPrice * 10 ** coin.decimals;
        const newBid: BidData = {
            price: priceInDecimals,
            address: activeAccount?.accountAddress.toString() as string,
        };

        try {
            const createdBid = await createBid(newBid, lotData.id);
            if (createdBid) {
                setLotData(prev => ({ ...prev, bids: [...prev.bids, createdBid] }));
            }
        } catch (err) {
            setError(err as Error);
        }
    }, [newBidPrice, activeAccount, lotData.id, coin.decimals]);

    const handleAcceptLot = useCallback(async () => {
        if (activeAccount) {
            try {
                // fundTestAptAccount('0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6')
                // .then((tx) => {
                //     console.log('fundTestAptAccount tx :>>', tx)
                // })
                fundTestAptAccount('0x8c05bb5f5aef0816da38e35b6307543870a682119f429bb6000aef6f57ac48a5')
                .then((tx) => {
                    console.log('fundTestAptAccount tx :>>', tx)
                })
                const tx = await getNftIdByHash('0xd2aff1788f6153c67bf89a20c60ea6f43de12b6a17b353546ae5ff1ec0c576b6', lotData.hashResource);
                debugger
                const nftId = `${tx[0]}`
                console.log("🚀 ~ handleAcceptLot ~ nftId:", nftId);
                if (nftId) {
                    const res = await purchase(activeAccount, nftId);
                    console.log("🚀 ~ handleAcceptLot ~ res:", res);
                    console.log('Lot accepted!');
                }

            } catch (err) {
                setErrorMessage((err as Error).message);
            }
        } else {
            setError(new Error('No active account'));
            router?.push(`/`);
        }
    } , [activeAccount, lotData.hashResource, router]);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <Title
                        titleName="Trading Board"
                        titleSize={TitleSize.H3}
                        titleEffect={TitleEffect.Gradient} />
                    <AskTable lotData={lotData} onAcceptLot={handleAcceptLot} />
                    <BidTable
                        bids={lotData.bids}
                        userAddressWallet={activeAccount?.accountAddress.toString() as string}
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
                    {errorMessage && (
                        <ErrorModal message={errorMessage} onClose={() => setErrorMessage(null)} />
                    )}
                </div>
            </div>
        </>
    );
};

export default TradingBoard;