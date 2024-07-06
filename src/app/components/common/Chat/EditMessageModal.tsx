import React, { useState } from 'react';

interface EditMessageModalProps {
    message: any;
    onClose: () => void;
    onSave: (editedMessage: string) => void;
}

const EditMessageModal: React.FC<EditMessageModalProps> = ({ message, onClose, onSave }) => {
    const [editedMessage, setEditedMessage] = useState<string>(message?.text || '');

    return (
        <div className="modal">
            <div className="modal-content">
                <textarea value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
                <button onClick={() => onSave(editedMessage)}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditMessageModal;