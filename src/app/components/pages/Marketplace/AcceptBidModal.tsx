import React from 'react'; 
import { BidData } from './trading/trade.interfaces';
import { useSiteStore } from '@/app/hooks/store';

interface AcceptBidModalProps {
    bid: BidData | null;
    askPrice: number;
    onClose: () => void;
    onAccept: () => void;
}

const AcceptBidModal: React.FC<AcceptBidModalProps> = ({ bid, askPrice, onClose, onAccept }) => {
   const { coin } = useSiteStore(); 
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-between border-b-2 border-dotted">
                <h2 className="text-lg font-bold mb-2 text-black">Accept Bid</h2>
                <span className="close text-blue-500 text-xl cursor-pointer" onClick={onClose}>&times;</span>
                </div>
                <div className="mb-4 text-black">
                    <strong>Bid Price:</strong> {bid?.price}
                </div>
                <div className="mb-4 text-black">
                    <strong>Ask Price:</strong> {askPrice}
                </div>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded ml-2"
                    onClick={onAccept}
                >
                    Accept Lot
                </button>
            
            </div>
        </div>
    );
};

export default AcceptBidModal;