'use client'

import { useState } from "react";

interface DmChatModalProps {
    ownerAddress: string;
    currentUserAddress: string;
    onClose: () => void;
    onSend: (message: string) => void;
}

const DmChatModal: React.FC<DmChatModalProps> = ({ ownerAddress, currentUserAddress, onClose, onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    return (
        <div className="inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
                <div className="flex  justify-between border-b-2 border-dotted">
                <h2 className="text-lg font-bold mb-2 text-black">Send Message</h2>
                <span className="close text-blue-500 text-xl cursor-pointer" onClick={onClose}>&times;</span>
                    </div> 
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        To:
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={ownerAddress}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        From:
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={currentUserAddress}
                        disabled
                    />
                </div>
                <div className="mb-4 h-32 overflow-y-scroll border p-2">
                    {/* Render chat history here */}
                    {/* Example: 
                    {chatHistory.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.from}:</strong> {msg.text}
                        </div>
                    ))}
                    */}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Message
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded mr-2"
                    onClick={handleSend}
                >
                    Send
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

export default DmChatModal;