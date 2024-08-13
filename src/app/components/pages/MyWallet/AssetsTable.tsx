import React from 'react';
import { Asset } from './MyWallet';

interface AssetsTableProps {
    assets: Asset[];
    onJoin: (item: Asset) => void;
}

const AssetsTable: React.FC<AssetsTableProps> = ({ assets, onJoin }) => {
    return (
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
                                onClick={() => onJoin(asset)}
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

export default AssetsTable;
