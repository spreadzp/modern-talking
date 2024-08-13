'use client'
import { useEffect, useState } from 'react';
import { useSiteStore } from '@/app/hooks/store';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import Title, { TitleEffect, TitleSize } from '@/app/components/shared/Title';

interface AskTableProps {
    lotData: any;
    onAcceptLot: () => void; // Add this prop to handle the button click
}

const AskTable: React.FC<AskTableProps> = ({ lotData, onAcceptLot }) => {
    const { activeAccount } = useKeylessAccounts();
    const [isOwnerLot, setIsOwnerLot] = useState(false);
    const { coin } = useSiteStore();

    useEffect(() => {
        if (lotData['owner'] && lotData['owner'].address === activeAccount?.accountAddress.toString()) {
            setIsOwnerLot(true);
        }
    }, [lotData, setIsOwnerLot, activeAccount]);

    return (
        <>
            <Title
                titleName="Ask"
                titleSize={TitleSize.H4}
                titleEffect={TitleEffect.Gradient} />

            <table className="table-auto w-full text-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Ask Price</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2 text-center align-middle">
                            {lotData.price.toString()} {coin.symbol}
                        </td>
                        <td className="border px-4 py-2 text-center align-middle">
                            {isOwnerLot ? <div>You are the owner of this lot</div> :(
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={onAcceptLot}
                                >
                                    Accept Lot
                                </button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default AskTable;