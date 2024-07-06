import React, { useState } from 'react';

interface ForwardMessageModalProps {
    message: any;
    onClose: () => void;
    onSend: (newMessage: any) => void;
}

const ForwardMessageModal: React.FC<ForwardMessageModalProps> = ({ message, onClose, onSend }) => {
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    return (
        <div className="modal">
            <div className="modal-content">
                <p>{message?.text}</p>
                <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                    {/* Options for addresses */}
                </select>
                <button onClick={() => onSend(selectedAddress)}>Send</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ForwardMessageModal;