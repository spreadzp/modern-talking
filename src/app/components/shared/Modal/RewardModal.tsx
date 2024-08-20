import React, { useState } from 'react';

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void; // Adjust the type as needed
    nameSubmit: string;
}

const RewardModal: React.FC<RewardModalProps> = ({ isOpen, onClose, onSubmit, nameSubmit }) => {
 
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [sum, setSum] = useState('');
    //const [token, setToken] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ( description && condition && sum ) {
            const newReward = { 
                description,
                condition,
                sum: Number(sum),
               // token,
            };
            onSubmit(newReward);
            onClose();
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

            <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Create Reward</p>
                        <div className="modal-close cursor-pointer z-50" onClick={onClose}>
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="condition">
                                Condition
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="condition" type="text" value={condition} onChange={(e) => setCondition(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="sum">
                                Sum
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="sum" type="text" value={sum} onChange={(e) => setSum(e.target.value)} />
                        </div>
                        {/* <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="token">
                                Token
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="token" type="text" value={token} onChange={(e) => setToken(e.target.value)} />
                        </div> */}
                        <div className="modal-footer">
                            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                {`${nameSubmit}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RewardModal;