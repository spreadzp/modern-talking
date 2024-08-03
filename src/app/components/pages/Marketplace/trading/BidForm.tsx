import React from 'react';

interface BidFormProps {
    newBidPrice: number;
    onNewBidPriceChange: (price: number) => void;
    onCreateNewBid: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ newBidPrice, onNewBidPriceChange, onCreateNewBid }) => {
    return (
        <div className="mt-4">
            <input
                type="number"
                placeholder="New Bid Price"
                value={newBidPrice}
                onChange={(e) => onNewBidPriceChange(Number(e.target.value))}
                className="border px-4 py-2 mr-2 text-black"
            />
            <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={onCreateNewBid}
            >
                Create New Bid
            </button>
        </div>
    );
};

export default BidForm;