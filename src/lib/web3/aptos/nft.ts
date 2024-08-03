import { Aptos, AptosConfig, Network, Account, KeylessAccount } from "@aptos-labs/ts-sdk";
import * as ABI from "./abi-nft.json";
import { aptosClient } from "./constants";

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;


 
export async function mintNft(signer: KeylessAccount, uri: string): Promise<any> {

    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI.address}::nft::initialize_nft`,
            typeArguments: [],
            functionArguments: [signer.accountAddress.toString(), uri],
        },
    });
    const committedTxn = await aptosClient.signAndSubmitTransaction({
        signer,
        transaction: txn,
    });
    return await aptosClient.waitForTransaction({
        transactionHash: committedTxn.hash,
    });
} 