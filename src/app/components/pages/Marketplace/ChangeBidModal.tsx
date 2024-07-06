 
import React, { useState, useEffect } from 'react';
import { Bid } from './TradingBoard';

interface ChangeBidModalProps {
    bid: Bid | null;
    onClose: () => void;
    onSave: (newPrice: number) => void;
    onRemove: () => void;
}

const ChangeBidModal: React.FC<ChangeBidModalProps> = ({ bid, onClose, onSave, onRemove }) => {
    const [newPrice, setNewPrice] = useState<number | undefined>(Number(bid?.price));

    useEffect(() => {
        setNewPrice(Number(bid?.price));
    }, [bid]);

    const handleSave = () => {
        if (newPrice !== undefined) {
            onSave(newPrice);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-bold mb-2">Change Bid</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        New Price
                    </label>
                    <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newPrice}
                        onChange={(e) => setNewPrice(Number(e.target.value))}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSave}
                >
                    Save New Price
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={onRemove}
                >
                    Remove Bid
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

export default ChangeBidModal;