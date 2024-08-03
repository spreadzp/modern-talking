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
            functionArguments: [ uri],
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


export async function getNftIdByHash(signer: KeylessAccount, hash: string) {
    // const payload = {
    //     payload: {
    //         function: `${ABI.address}::nft::get_nft_id_by_hash` as never,
    //         typeArguments: [],
    //         functionArguments: [signer.accountAddress.toString(),  hash],
    //     }

    // };

    const response = await aptosClient.account.getAccountResources({accountAddress: signer.accountAddress.toString()});
    return response ;
}