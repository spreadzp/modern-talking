'use client'

import { getMarketplaceByHash } from "@/server/marketplace"; 
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { getIconByName } from "./Icons";

interface MarketDataProps {
    hash: any;
}

const MarketData: React.FC<MarketDataProps> = ({ hash }) => {
    console.log("🚀 ~ hash:", hash)
    const [marketData, setMarketData] = useState({} as any);
    const [maxBidPrice, setMaxBidPrice] = useState<string>('0');
    useEffect(() => {
        getMarketplaceByHash(hash)
            .then((data) => {
                debugger
                console.log("🚀 ~ .then ~ data:", data)
                setMarketData(data)
                // max price from bids
                const maxBid = data.bids.reduce((max: any, bid: any) => (bid.price > max ? bid.price : max), 0);
                setMaxBidPrice(maxBid.toString())
            })
    }, [])

    const redirectToMarketplace = (hash: any) => {
        window.location.href = `/trading-board/${hash}-${marketData.typeLot}`
    }
    return (
        <div className="flex items-center space-x-2">{
            marketData.price ?
                <> 
                    <span>Price for 1 NFT: ${marketData?.price.toString()}</span>
                    <span> Bids: {marketData['bids']?.length}</span>
                    <span> Highest Bid: ${maxBidPrice}</span>
                    <button className="joinButton cursor-pointer icon-white glowing-icon"  onClick={() => redirectToMarketplace(hash)}  title="Goto the marketplace"> {getIconByName('Assets')}</button>
                </> :
                <Spinner />
        }
        </div>
    );
};

export default MarketData;