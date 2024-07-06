import React from 'react';

interface RemoveMessageModalProps {
    message: any;
    onClose: () => void;
    onRemove: () => void;
}

const RemoveMessageModal: React.FC<RemoveMessageModalProps> = ({ message, onClose, onRemove }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message?.text}</p>
                <button onClick={onRemove}>Remove</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default RemoveMessageModal;