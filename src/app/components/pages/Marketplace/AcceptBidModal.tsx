import React from 'react';
import { Bid } from './TradingBoard';

interface AcceptBidModalProps {
    bid: Bid | null;
    askPrice: number;
    onClose: () => void;
    onAccept: () => void;
}

const AcceptBidModal: React.FC<AcceptBidModalProps> = ({ bid, askPrice, onClose, onAccept }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-bold mb-2 text-black">Accept Bid</h2>
                <div className="mb-4 text-black">
                    <strong>Bid Price:</strong> {bid?.price}
                </div>
                <div className="mb-4 text-black">
                    <strong>Ask Price:</strong> {askPrice}
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onAccept}
                >
                    Accept Lot
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AcceptBidModal;