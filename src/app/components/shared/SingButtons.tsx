'use client'

import { useSiteStore } from "../../hooks/store"
import { getUserByEmail } from "@/server/users"
import { useEffect } from "react"
import WalletAddressDisplay from "./WalletAddressDisplay"
import { getIconByName } from "./Icons"
import { useKeylessAccounts } from "@/lib/web3/aptos/keyless/useKeylessAccounts"
import BalanceDisplay from './BalanceDisplay'; // Import the new component
import { fundTestAptAccount, mintTokenTransaction } from "@/lib/web3/aptos/provider"
import { getCollectionDataByCreatorAddress, getNftIdByHash, mintNft } from "@/lib/web3/aptos/nft"
import { getAllListingObjectAddresses, getAllSellers, getListingObjectAndSeller, getListingObjectPrice, listNftWithFixedPrice, purchase } from "@/lib/web3/aptos/marketplace"
import { CoinChain } from "@/app/interfaces/common.interfaces"

export default function SingButtons() {
    const { activeAccount, disconnectKeylessAccount, accounts } = useKeylessAccounts();
    const { setUserAddressWallet, setCurrentUser, setCoin } = useSiteStore()


    useEffect(() => {
        if (accounts && accounts[0] && activeAccount) {
            getUserByEmail(accounts[0].idToken.decoded.email!)
                .then((user) => {
                    setCurrentUser(user)
                    setUserAddressWallet(activeAccount?.accountAddress.toString())
                });
            // fundTestAptAccount(activeAccount.accountAddress.toString())
            // .then((tx) => {
            //     console.log('fundTestAptAccount tx :>>', tx)
            // })
            // mintNft(activeAccount, '0xd46708AE20B66B06B27Cb5f328e5819eF4D25879')
            // .then(tx => {
            //     console.log('!!!!!!!!!!!!tx :>>', tx)
            // })
            getCollectionDataByCreatorAddress(activeAccount)
                .then((tx) => {
                    console.log('getCollectionDataByCreatorAddress tx :>>', tx)
                })
            // getNftIdByHash(activeAccount.accountAddress.toString(), '0xd46708AE20B66B06B27Cb5f328e5819eF4D25879')
            //     .then((tx) => {
            //         console.log('getNftIdByHash tx :>>', tx)
            //         const nftId = tx[0] as string
            //         console.log("🚀 ~ .then ~ nftId:", nftId)
            //         getAllListingObjectAddresses('0xf6b79100da387d0a15f47a70882f5b7128daf148b3fdcbb5473bbd24f2358a0f') //activeAccount.accountAddress.toString())
            //             .then((response) => {
            //                 console.log("getAllListingObjectAddresses", response)
            //                 getListingObjectAndSeller(response[0])
            //                     .then((res) => {
            //                         console.log("getListingObjectAndSeller", res)
            //                         const data = {
            //                             nftId: res[0],
            //                             seller: res[1],
            //                         }
            //                         console.log("🚀 ~ .then ~ data:", data)
            //                         getListingObjectPrice(response[0])
            //                             .then((response) => {
            //                                 console.log("getListingObjectPrice", response)
            //                                 const price = response
            //                                 console.log("🚀 ~ .then ~ price:", price)
            //                             })
            //                             purchase(activeAccount, response[0])
            //                                 .then((responsePurchase) => console.log("@@@@@@@@@ responsePurchase", responsePurchase))
            //                                 // listNftWithFixedPrice(activeAccount, nftId, price)
            //                                 //     .then((response) => console.log("@@@@@@@@@", response))
            //                     })

            //             })
            //         //  listNftWithFixedPrice(activeAccount, nftId, 555)
            //         // .then((response) => console.log("@@@@@@@@@", response))
            //         getAllSellers()
            //             .then((response) => {
            //                 console.log("getAllSellers", response)
            //                 const sellerAddress = response[0]
            //                 console.log("🚀 ~ .then ~ sellerAddress:", sellerAddress)

            //             })


            //     })
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