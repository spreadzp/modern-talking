// SetupAddresses.tsx
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useKeylessAccounts } from '@/lib/web3/aptos/keyless/useKeylessAccounts';
import { executeReward, setAddresses } from '@/lib/web3/aptos/rewardsContract';
import Table from '../../shared/Table';

interface SetupAddressesProps {
    currentReward: {
        nftId: string;
        usersAddresses: string[];
        totalSum: number;
    };
}

type UserDataForReward = {
    address: string;
    amount: number;
}

const SetupAddresses: React.FC<SetupAddressesProps> = ({ currentReward }) => {
    const { activeAccount } = useKeylessAccounts();
    const [users, setUsers] = useState<UserDataForReward[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentReward.nftId) {
            const sumPerAccount = Math.floor(currentReward.totalSum / currentReward.usersAddresses.length);
            const usersData = currentReward.usersAddresses.map(address => {
                const data: UserDataForReward = {
                    address,
                    amount: sumPerAccount
                }
                return data;
            })
            setUsers(usersData);
            setLoading(false);
        }
    }, [currentReward.nftId, currentReward.usersAddresses, currentReward.totalSum]);

    const approveListAddresses = useCallback(async () => {
        try {
            if (activeAccount) {
                const tx = await setAddresses(activeAccount, currentReward.nftId, currentReward.usersAddresses)
                console.log("🚀 ~ approveListAddresses ~ tx:", tx)
            }
        } catch (error) {
            console.error('Error approving addresses:', error);
        }
    }, [currentReward, activeAccount]);

    const startReward = useCallback(async () => {
        try {
            if (activeAccount) {
                const tx = await executeReward(activeAccount, currentReward.nftId)
                console.log("🚀 ~ executeReward ~ tx:", tx)
            }
        } catch (error) {
            console.error('Error approving addresses:', error);
        }
    }, [activeAccount, currentReward]);
    return (
        <div className="container mx-auto p-4 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Setup Addresses</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table
                    data={users.map((user, index) => ({
                        '#': index + 1,
                        address: user.address,
                        amount: user.amount,
                    }))}
                    buttonLabel="Approve Addresses"
                    onBuyClick={approveListAddresses}
                />
            )}
            <button onClick={() => startReward()}>Execute rewards</button>
        </div>
    );
};

export default SetupAddresses;