import React from 'react';

interface RemoveMessageModalProps {
    message: any;
    onClose: () => void;
    onRemove: (removedMessage: string) => void;
}

const RemoveMessageModal: React.FC<RemoveMessageModalProps> = ({ message, onClose, onRemove }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
        <div className="bg-white p-4 rounded-lg">
            <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
            <h2 className="text-lg font-bold mb-2 text-black">Remove message</h2>
            <div className="mb-4 text-black">
                <p>{message?.text}</p>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-red-500 font-bold py-2 px-4 rounded mr-2" onClick={() => onRemove(message)}>Remove</button>
            </div>
        </div>
        </div>
    );
};

export default RemoveMessageModal;