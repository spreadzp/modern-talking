// JoinActivityModal.tsx
import React from 'react';
import { Asset, Reward } from './MyWallet';

interface JoinActivityModalProps {
    item: Asset | Reward | null;
    onClose: () => void;
    onJoin: () => void;
}

const JoinActivityModal: React.FC<JoinActivityModalProps> = ({ item, onClose, onJoin }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Join {item.name}</h2>
                <button onClick={onJoin}>Join Now</button>
            </div>
        </div>
    );
};

export default JoinActivityModal;