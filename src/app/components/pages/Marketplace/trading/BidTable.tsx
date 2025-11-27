import Title, { TitleEffect, TitleSize } from '@/app/components/shared/Title';
import { Bid, User } from '@prisma/client';
import React from 'react';
import Table from '@/app/components/shared/Table';
import PriceCell from '@/app/components/shared/table/PriceCell';
import AddressCell from '@/app/components/shared/table/AddressCell';

interface BidTableProps {
    bids: (Bid & { owner: User })[];
    userAddressWallet: string;
    showAccept: boolean;
    onAccept: (bid: Bid & { owner: User }) => void;
    onChangeBid: (bid: Bid & { owner: User }) => void;
}

const BidTable: React.FC<BidTableProps> = ({ bids, userAddressWallet, showAccept, onAccept, onChangeBid }) => {
    const sortedBids = [...bids].sort((a, b) => Number(b.price) - Number(a.price));

    const columns = [
        {
            header: 'Bid Price',
            accessor: 'price',
            cell: (price: number) => <PriceCell price={price} />,
        },
        {
            header: 'Address',
            accessor: 'owner',
            cell: (owner: User) => <AddressCell address={owner.address} />,
        },
    ];

    const action = {
        label: 'Action',
        onClick: (bid: Bid & { owner: User }) => {
            if (bid.owner.address === userAddressWallet) {
                onChangeBid(bid);
            } else {
                onAccept(bid);
            }
        },
        getButton: (bid: Bid & { owner: User }) => (
            <>
                {showAccept && bid.owner.address !== userAddressWallet && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onAccept(bid)}
                    >
                        Accept
                    </button>
                )}
                {bid.owner.address === userAddressWallet && (
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => onChangeBid(bid)}
                    >
                        Rebid
                    </button>
                )}
            </>
        ),
    };

    return (
        <>
            <Title
                titleName="Bids"
                titleSize={TitleSize.H4}
                titleEffect={TitleEffect.Gradient}
            />
            <Table data={sortedBids} columns={columns} action={action} />
        </>
    );
};

export default BidTable;