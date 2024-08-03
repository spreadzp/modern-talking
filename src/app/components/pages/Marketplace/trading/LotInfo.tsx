import React from 'react';
import { LotData } from './trade.interfaces';

interface LotInfoProps {
    lotData: LotData;
}

const LotInfo: React.FC<LotInfoProps> = ({ lotData }) => {
    return (
        <>
            <div className="mb-4">
                <strong>Lot Hash:</strong> {lotData.hashResource}
            </div>
            <div className="mb-4">
                <strong>Ask Price:</strong> {lotData.price.toString()}
            </div>
            <div className="mb-4">
                <strong>Seller Address:</strong> {lotData.sellerAddress}
            </div>
        </>
    );
};

export default LotInfo;
