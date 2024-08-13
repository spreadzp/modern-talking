 
import { useSiteStore } from '@/app/hooks/store';
import { Bid } from '@prisma/client';
import React, { useState, useEffect } from 'react'; 

interface ChangeBidModalProps {
    bid: Partial<Bid> | null;
    onClose: () => void;
    onSave: (newPrice: number) => void;
    onRemove: () => void;
}

const ChangeBidModal: React.FC<ChangeBidModalProps> = ({ bid, onClose, onSave, onRemove }) => {
    const { selectedOwnerAddress, userAddressWallet, coin } = useSiteStore();
    const [newPrice, setNewPrice] = useState<number | undefined>(Number(bid?.price));

    useEffect(() => {
        setNewPrice(Number(bid?.price)/ 10**coin.decimals);
    }, [bid]);

    const handleSave = () => {
        if (newPrice !== undefined) {
            onSave(newPrice);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
            <div className="flex  justify-between border-b-2 border-dotted">
                <h2 className="text-lg font-bold mb-2 text-black">Change Bid</h2>
                <span className="close text-blue-500 text-xl cursor-pointer" onClick={onClose}>&times;</span>
                </div>
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
                    className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSave}
                >
                    Save New Price
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-yellow-500 font-bold py-2 px-4 rounded mr-2"
                    onClick={onRemove}
                >
                    Remove Bid
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-yellow-500 font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ChangeBidModal;