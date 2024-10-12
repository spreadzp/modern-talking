import React, { useEffect, useMemo, useState } from 'react';
import { getBalance, fundTestAptAccount } from '@/lib/web3/aptos/provider';
import { useSiteStore } from '@/app/hooks/store';
import { CoinChain } from '@/app/interfaces/common.interfaces';

interface BalanceDisplayProps {
    address: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ address }) => {
    const [balances, setBalances] = useState<{ amount: number; symbol: string; decimals: number }[]>([]);
    const { setCoin, setUserBalance } = useSiteStore();

    useEffect(() => {
        const coin: CoinChain = {
            name: 'Aptos',
            symbol: 'APT',
            decimals: 8,
            logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aptos/info/logo.png'
        };
        setCoin(coin);
    }, [setCoin]);

    useEffect(() => {
        getBalance(address)
            .then((balanceList) => {
                const formattedBalances = balanceList.map(balance => {
                    const symbol = balance?.metadata?.symbol || '';
                    const decimals = balance?.metadata?.decimals || 0;
                    const clearAmount = +balance.amount / 10 ** decimals;
                    return { amount: clearAmount, symbol, decimals };
                });
                setBalances(formattedBalances);
                setUserBalance(balanceList[0].amount); // Assuming you want to set the balance of the first coin
            })
            .catch((error) => {
                console.log("🚀 ~ .then ~ error:", error);
            });
    }, [address, setUserBalance]);

    const formattedBalances = useMemo(() => {
        return balances.map(balance => `${balance.amount} ${balance.symbol}`);
    }, [balances]);

    return (
        <div className="mr-4">
            {formattedBalances.map((balance, index) => (
                <div key={index}>{balance}</div>
            ))}
        </div>
    );
};

export default BalanceDisplay;