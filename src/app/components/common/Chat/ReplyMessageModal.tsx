'use client'

import { useState } from "react";

interface EditMessageModalProps {
    message: any;
    onClose: () => void;
    onSave: (replayedMessage: string) => void;
}

const ReplyMessageModal: React.FC<EditMessageModalProps> = ({ message, onClose, onSave }) => {
    const [inputMessage, setInputMessage] = useState<string>(message?.text || '');
    const [replayedMessage, setReplayedMessage] = useState<string>(message?.text || '');
    const cutInputMessage = () => {
        if (inputMessage.length > 15) {
            return inputMessage.slice(0, 15) + "...\n replied: \n \t";
        } else {
            return inputMessage + "...\n replied: \n \t";
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black">
            <div className="bg-white p-4 rounded-lg">
                <div className="flex  justify-around">
                <h2 className="text-lg font-bold mb-2 text-black">Reply message</h2>
                <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
                </div> 
                <div className="mb-4 text-black">{cutInputMessage()}</div>
                <div className="mb-4 text-black">
                    <textarea 
                        className="border border-gray-300 p-2 w-full h-32" 
                        onChange={(e) => setReplayedMessage(cutInputMessage() + e.target.value)} 
                    /></div>
                    <div className="flex  justify-around"> 
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded mr-2" onClick={() => onSave(replayedMessage)}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default ReplyMessageModal;