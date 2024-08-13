import Title, { TitleEffect, TitleSize } from '@/app/components/shared/Title';
import WalletAddressDisplay from '@/app/components/shared/WalletAddressDisplay';
import { useSiteStore } from '@/app/hooks/store';
import { Bid, User } from '@prisma/client';
import React from 'react'; 
interface BidTableProps {
    bids: (Bid & { owner: User })[];
    userAddressWallet: string;
    showAccept: boolean;
    onAccept: (bid: Bid & { owner: User }) => void;
    onChangeBid: (bid: Bid & { owner: User }) => void;
}

const BidTable: React.FC<BidTableProps> = ({ bids, userAddressWallet, showAccept, onAccept, onChangeBid }) => {
    const {   coin } = useSiteStore();
    const sortedBids = [...bids].sort((a, b) => Number(b.price) - Number(a.price));

    return (
        <>     
            <Title
                        titleName="Bids"
                        titleSize={TitleSize.H4}
                        titleEffect={TitleEffect.Gradient} />
            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Bid Price</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedBids.map((bid, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 text-center align-middle">{+bid.price.toString() / 10**coin.decimals}</td>
                            <td className="border px-4 py-2 text-center align-middle">
                                <WalletAddressDisplay address={bid.owner.address} />
                            </td>
                            <td className="border px-4 py-2 text-center align-middle">
                                {showAccept && bid.owner.address !== userAddressWallet && <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                                    onClick={() => onAccept(bid)}
                                >
                                    Accept
                                </button>}
                                {bid.owner.address === userAddressWallet && <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => onChangeBid(bid)}
                                >
                                    Rebid
                                </button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default BidTable;