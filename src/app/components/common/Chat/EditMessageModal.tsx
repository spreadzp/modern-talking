import React, { useState } from 'react';

interface EditMessageModalProps {
    message: any;
    onClose: () => void;
    onSave: (editedMessage: string) => void;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({ message, onClose, onSave }) => {
    const [editedMessage, setEditedMessage] = useState<string>(message?.text || '');

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <span className="close text-black text-xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-lg font-bold mb-2 text-black">Edit message</h2>
                <div className="mb-4 text-black">
                <textarea value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
                <button className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded mr-2" onClick={() => onSave(editedMessage)}>Save</button>
            </div>
        </div>
        </div>
    );
};

export default EditMessageModal;