import React from 'react';
import { Reward } from './MyWallet';

interface RewardsTableProps {
    rewards: Reward[];
    onJoin: (item: Reward) => void;
}

const MyRewardsTable: React.FC<RewardsTableProps> = ({ rewards, onJoin }) => {
    return (
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
                                onClick={() => onJoin(reward)}
                            >
                                Check
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MyRewardsTable;