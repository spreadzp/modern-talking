
import React, { useState, useEffect } from 'react';
import JoinActivityModal from './JoinActivityModal';
import StarryBackground from '../../shared/StarryBackground';
import Title, { TitleEffect, TitleSize } from '../../shared/Title';

export interface Asset {
    id: number;
    name: string;
    ownedMe: number;
}

export interface Reward {
    id: number;
    name: string;
    ownedMe: number;
    sum: number;
    airdropDate: string;
}

const MyWallet: React.FC = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<Asset | Reward | null>(null);

    useEffect(() => {
        // Mock data for assets
        const mockAssets: Asset[] = [
            { id: 1, name: 'Discussion 1', ownedMe: 5 },
            { id: 2, name: 'Survey 1', ownedMe: 3 },
            { id: 3, name: 'Voting 1', ownedMe: 7 },
            { id: 4, name: 'DataSet 1', ownedMe: 2 }
        ];

        // Mock data for rewards
        const mockRewards: Reward[] = [
            { id: 1, name: 'Reward 1', ownedMe: 10, sum: 50, airdropDate: '2023-12-01' },
            { id: 2, name: 'Reward 2', ownedMe: 15, sum: 75, airdropDate: '2023-11-15' },
            { id: 3, name: 'Reward 3', ownedMe: 20, sum: 100, airdropDate: '2023-10-30' }
        ];

        setAssets(mockAssets);
        setRewards(mockRewards);
    }, []);

    const handleJoin = (item: Asset | Reward) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const joinActivity = () => {
        console.log('Joining activity:', selectedItem);
        closeModal();
    };

    return (
        <>
            <StarryBackground />
            <div className="min-h-screen ">
                <div className="container mx-auto p-4">
                    <div className="flex items-center justify-center"><Title
                        titleName="My Activity"
                        titleSize={TitleSize.H3}
                        titleEffect={TitleEffect.Gradient}
                    /></div>
                    <Title
                        titleName="Assets"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    />
                    <table className="table-auto w-full text-yellow-500">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Owned Me</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset) => (
                                <tr key={asset.id}>
                                    <td className="border px-4 py-2 text-center align-middle">{asset.name}</td>
                                    <td className="border px-4 py-2 text-center align-middle">{asset.ownedMe}</td>
                                    <td className="border px-4 py-2 text-center align-middle">
                                        <button
                                            className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                                            onClick={() => handleJoin(asset)}
                                        >
                                            Check
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Title
                        titleName="Rewards"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient}
                    />
                    <table className="table-auto w-full text-yellow-500">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Owned Me</th>
                                <th className="border px-4 py-2">Sum</th>
                                <th className="border px-4 py-2">Date to Airdrop</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rewards.map((reward) => (
                                <tr key={reward.id}>
                                    <td className="border px-4 py-2 text-center align-middle">{reward.name}</td>
                                    <td className="border px-4 py-2 text-center align-middle">{reward.ownedMe}</td>
                                    <td className="border px-4 py-2 text-center align-middle">{reward.sum}</td>
                                    <td className="border px-4 py-2 text-center align-middle">{new Date(reward.airdropDate).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2 text-center align-middle">
                                        <button
                                            className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                                            onClick={() => handleJoin(reward)}
                                        >
                                            Check
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showModal && (
                        <JoinActivityModal
                            item={selectedItem}
                            onClose={closeModal}
                            onJoin={joinActivity}
                        />
                    )}
                </div>
            </div>

        </>
    );
};

export default MyWallet;