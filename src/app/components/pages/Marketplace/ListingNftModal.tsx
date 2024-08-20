
import React, { useState, useEffect } from 'react';

interface ListingNftModalProps { 
    onClose: () => void;
    onListing: (newPrice: number) => void;
}

const MINIMAL_PRICE_FOR_SALE = 0.01;

const ListingNftModal: React.FC<ListingNftModalProps> = ({   onClose, onListing, }) => {
    const [newPrice, setNewPrice] = useState<number | undefined>(Number(MINIMAL_PRICE_FOR_SALE));

 
    const handleSave = () => {
        if (newPrice !== undefined) {
            onListing(newPrice);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <div className="flex  justify-between border-b-2 border-dotted">
                    <h2 className="text-lg font-bold mb-2 text-black">Set Price</h2>
                    <span className="close text-blue-500 text-xl cursor-pointer" onClick={onClose}>&times;</span>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Price for selling the NFT
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
                    Save Price
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

export default ListingNftModal;