import React, { useState } from 'react';

interface ForwardMessageModalProps {
    message: any;
    onClose: () => void;
    onSend: (newMessage: any) => void;
}

const ForwardMessageModal: React.FC<ForwardMessageModalProps> = ({ message, onClose, onSend }) => {
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-bold mb-2 text-black">Forward message</h2>
                <div className="mb-4 text-black">
                    <p>{message?.text}</p>
                    <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                        {/* Options for addresses */}
                    </select>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded mr-2" onClick={() => onSend(selectedAddress)}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ForwardMessageModal;