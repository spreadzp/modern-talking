import React, { useEffect, useState } from 'react';
import { getBalance, fundTestAptAccount } from '@/lib/web3/aptos/provider';

interface BalanceDisplayProps {
    address: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ address }) => {
    const [amount, setAmount] = useState(0);
    const [symbol, setSymbol] = useState('');

    useEffect(() => {
        getBalance(address)
            .then((balance) => {              
                console.log("🚀 ~ .then ~ balance:", balance);
                const clearAmount = balance[0].amount;
                setSymbol(balance[0].metadata?.symbol as string);
                setAmount(clearAmount);
            })
            .catch((error) => {
                console.log("🚀 ~ .then ~ error:", error);
                fundTestAptAccount(address)
                    .then((balance) => {
                        console.log("🚀 ~ .then ~ balance:", balance);
                    });
            });
    }, [address]);

    return (
        <div className="mr-4">
            {`${amount} ${symbol}`}
        </div>
    );
};

export default BalanceDisplay;