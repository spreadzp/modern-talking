'use client'
import { useEffect, useState } from 'react';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import Title, { TitleEffect, TitleSize } from '@/app/components/shared/Title';
import Table from '@/app/components/shared/Table';
import PriceCell from '@/app/components/shared/table/PriceCell';

interface AskTableProps {
    lotData: any;
    onAcceptLot: () => void;
}

const AskTable: React.FC<AskTableProps> = ({ lotData, onAcceptLot }) => {
    const { activeAccount } = useKeylessAccounts();
    const [isOwnerLot, setIsOwnerLot] = useState(false);

    useEffect(() => {
        if (lotData?.owner?.address === activeAccount?.accountAddress.toString()) {
            setIsOwnerLot(true);
        }
    }, [lotData, activeAccount]);

    const columns = [
        {
            header: 'Ask Price',
            accessor: 'price',
            cell: (price: number) => <PriceCell price={price} />,
        },
    ];

    const action = {
        label: 'Accept Lot',
        onClick: onAcceptLot,
        getButton: () => (
            isOwnerLot ? (
                <div>You are the owner of this lot</div>
            ) : (
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onAcceptLot}
                >
                    Accept Lot
                </button>
            )
        ),
    };

    return (
        <>
            <Title
                titleName="Ask"
                titleSize={TitleSize.H4}
                titleEffect={TitleEffect.Gradient}
            />
            <Table data={[lotData]} columns={columns} action={action} />
        </>
    );
};

export default AskTable;