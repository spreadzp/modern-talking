import React, { useEffect, useMemo, useState } from 'react';
import { getBalance, fundTestAptAccount } from '@/lib/web3/aptos/provider';
import { useSiteStore } from '@/app/hooks/store';
import { CoinChain } from '@/app/interfaces/common.interfaces';

interface BalanceDisplayProps {
    address: string;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ address }) => {
    const [amount, setAmount] = useState(0);
    const { coin, setCoin } = useSiteStore()
    useEffect(() => {
        const coin: CoinChain = {
            name: 'Aptos',
            symbol: 'APT',
            decimals: 8,
            logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/aptos/info/logo.png'
        }
        setCoin(coin)
    }, [setCoin])
    useEffect(() => {
        console.log('call getBalance :>>',)
        getBalance(address)
            .then((balance) => {
                if (coin.decimals) {
                    const clearAmount = +balance[0].amount / 10 ** coin.decimals;
                    setAmount(clearAmount);
                }

            })
            .catch((error) => {
                console.log("🚀 ~ .then ~ error:", error);
                // fundTestAptAccount(address)
                //     .then((balance) => {
                //         console.log("🚀 ~ .then ~ balance:", balance);
                //     });
            });
    }, [address, setAmount, coin]);

    const formattedBalance = useMemo(() => {
        return `${amount} ${coin.symbol}`;
    }, [amount, coin.symbol]);
    return (
        <div className="mr-4">
            {formattedBalance}
        </div>
    );
};

export default BalanceDisplay;