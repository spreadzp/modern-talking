'use client'

import { useSiteStore } from "../../hooks/store"
import { getUserByEmail } from "@/server/users"
import { useEffect } from "react"
import WalletAddressDisplay from "./WalletAddressDisplay"
import { getIconByName } from "./Icons"
import { useKeylessAccounts } from "@/lib/web3/aptos/keyless/useKeylessAccounts"
import BalanceDisplay from './BalanceDisplay'; // Import the new component
import { mintTokenTransaction } from "@/lib/web3/aptos/provider" 
import { mintNft } from "@/lib/web3/aptos/nft"

export default function SingButtons() {
    const { activeAccount, disconnectKeylessAccount, accounts } = useKeylessAccounts();
    const { setUserAddressWallet, setCurrentUser } = useSiteStore()

    useEffect(() => {
        if (accounts && accounts[0] && activeAccount) {
            getUserByEmail(accounts[0].idToken.decoded.email!)
                .then((user) => {
                    setCurrentUser(user)
                    setUserAddressWallet(activeAccount?.accountAddress.toString())
                });
                mintNft(activeAccount, '0xd35708AE20B66B06B27Cb5f328e5819eF4D25877')
                .then((tx ) => {
                    console.log('tx :>>', tx)
                })
                // mintTokenTransaction(activeAccount, "test1", "test1", "test1", "test1")
                // .then((response) => console.log("@@@@@@@@@", response))
        }
    }, [accounts, setUserAddressWallet, setCurrentUser, activeAccount]);

    if (activeAccount) { 
        return (
            <div className="flex items-center space-x-4">
                <BalanceDisplay address={activeAccount.accountAddress.toString()} />
                <WalletAddressDisplay address={activeAccount.accountAddress.toString()} />
                <button
                    onClick={() => disconnectKeylessAccount()}
                    className="focus:outline-none"
                    title="Disconnect"
                >
                    {getIconByName('SignOut')}
                </button>
            </div>
        )
    }
}