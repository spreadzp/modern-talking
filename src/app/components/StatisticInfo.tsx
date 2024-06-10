import { useState } from "react"; 
import Table from "./Table";  
import { Modal } from "./Modal";
import ExpandableContent from "./ExpandableTable";

export const StatisticInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSendClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = (data: any) => {
        console.log('Submitted:', data);
        // Handle the form submission here
    };

    const coinsData = [
        { '#': 1, address: 'Address 1', amount: 100, symbol: 'BNB', name: 'BNB' },
    ];

    const tokensData = [
        { '#': 1, contractAddress: 'Address 1', name: 'Token 1', symbol: 'TKN', amount: 50 },
    ];

    const nftsData = [
        { '#': 1, name: 'NFT 1', symbol: 'NFT', nftId: '1', contractAddress: 'Address 1', uri: 'http://example.com/nft1', price: 1000, seller: 'Seller 1', nftMetadata: 'Metadata for NFT 1' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">


                {/* <ExpandableContent title="Surveys" isOpenContent={false}>
                    <Table data={coinsData} onBuyClick={() => handleSendClick()} /> 
                </ExpandableContent>

                <ExpandableContent title="Discussions" isOpenContent={false}>
                    <Table data={tokensData} onBuyClick={() => handleSendClick()} /> 
                </ExpandableContent>

                <ExpandableContent title="Data tagging for AI" isOpenContent={false}>
                    <Table data={nftsData} onBuyClick={() => handleSendClick()} /> 
                </ExpandableContent>

                <ExpandableContent title="Comment to earn" isOpenContent={false}>
                    <Table data={nftsData} onBuyClick={() => handleSendClick()} /> 
                </ExpandableContent> */}

                {/* {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
                )} */}
            </div>
        </div>
    );
};