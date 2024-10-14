// MyRewardsTable.tsx
import React from 'react';
import { Reward } from './MyWallet';

type MyRewardsTableProps = {
    rewards: any[];
    onJoin: (item: any) => void;
};

const MyRewardsTable: React.FC<MyRewardsTableProps> = ({ rewards, onJoin }) => {
    return (
        <table className="table-auto w-full text-yellow-200">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Sum in MDTN</th>
                    <th className="border px-4 py-2">Airdrop Date</th>
                    <th className="border px-4 py-2">Status</th> {/* Add status column */}
                    <th className="border px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {rewards.map((reward) => (
                    <tr key={reward.id}>
                        <td className="border px-4 py-2">{reward.description}</td>
                        <td className="border px-4 py-2">{reward.sum}</td>
                        <td className="border px-4 py-2">{reward.startDate instanceof Date ? reward.startDate.toLocaleDateString() : reward.startDate}</td>
                        <td className="border px-4 py-2">{reward.status}</td> {/* Display status */}
                        <td className="border px-4 py-2">
                            <button
                                className="bg-blue-500 hover:bg-[hsl(187,100%,68%)] text-yellow-500 font-bold py-2 px-4 rounded"
                                onClick={() => onJoin(reward)}
                            >
                                Join
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MyRewardsTable;