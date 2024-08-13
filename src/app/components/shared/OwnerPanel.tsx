'use client'
import { useSiteStore } from '@/app/hooks/store';
import { getIconByName } from './Icons';
import DmChatModal from './DmChatModal'; // Import the new component
import { useState } from 'react';
import WalletAddressDisplay from './WalletAddressDisplay';

 
const OwnerPanel: React.FC = ( ) => {
    const { selectedOwnerAddress, userAddressWallet } = useSiteStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tooltipText, setTooltipText] = useState("Copy the resource owner address");

    // const handleCopyAddress = () => {
    //     navigator.clipboard.writeText(selectedOwnerAddress);
    //     setTooltipText("Copied");
    //     setTimeout(() => setTooltipText("Copy the resource owner address"), 2000);
    // };

    const handleSendMessage = (message: string) => { 
        console.log("Sending message:", message); // TODO
        setIsModalOpen(false);
    };

    return (
        <div className="owner-panel flex items-center space-x-2">
            <button
                title="DM to the resource owner"
                className="dm-button"
                onClick={() => setIsModalOpen(true)}
            >
                {getIconByName('Chat')}
            </button>
            <WalletAddressDisplay address={selectedOwnerAddress} />
            {isModalOpen && (
                <DmChatModal
                    ownerAddress={selectedOwnerAddress}
                    currentUserAddress={userAddressWallet}
                    onClose={() => setIsModalOpen(false)}
                    onSend={handleSendMessage}
                />
            )}
        </div>
    );
};

export default OwnerPanel;