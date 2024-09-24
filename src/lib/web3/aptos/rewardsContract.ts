
import { KeylessAccount, InputGenerateTransactionPayloadData, TransactionWorkerEventsEnum } from "@aptos-labs/ts-sdk";
import { IndexerClient } from "aptos";
import * as ABI from "./ABIs/reward.json";
import { aptosClient } from "./constants";

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;
const ownerAddress = "0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6";
export async function getAdminRewardsAddress(admin: string): Promise<any> {

    const data = {
        payload: {
            function: `${ABI['address']}::reward::get_admin_address` as never,
            typeArguments: [],
            functionArguments: [admin],
        }

    };
    // debugger
    const response = await aptosClient.general.view(data);
    return response as string[];

}


export async function setupReward(signer: KeylessAccount, amount: number, end_time: number, nft_id: string): Promise<any> {

    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::reward::setup_reward` as never,
            typeArguments: [], //`${ABI['address']}::nft::NFT`
            functionArguments: [ownerAddress, amount, end_time, nft_id],
        }
    });
    const committedTxn = await aptosClient.signAndSubmitTransaction({
        signer: signer,
        transaction: txn,
    });
    return await aptosClient.waitForTransaction({
        transactionHash: committedTxn.hash,
    });
}


export async function changeAdmin(signer: KeylessAccount, new_admin: string): Promise<any> {
    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::reward::change_admin` as never,
            typeArguments: [],
            functionArguments: [new_admin],
        }
    });
    const committedTxn = await aptosClient.signAndSubmitTransaction({
        signer: signer,
        transaction: txn,
    });
    return await aptosClient.waitForTransaction({
        transactionHash: committedTxn.hash,
    });
}

export async function setAddresses(signer: KeylessAccount, nft_id: string, addresses: string[]): Promise<any> {

    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::reward::set_addresses` as never,
            typeArguments: [], //`${ABI['address']}::nft::NFT`
            functionArguments: [ownerAddress, nft_id, addresses],
        }
    });
    const committedTxn = await aptosClient.signAndSubmitTransaction({
        signer: signer,
        transaction: txn,
    });
    return await aptosClient.waitForTransaction({
        transactionHash: committedTxn.hash,
    });
}


export async function getRewardInfo(nft_id: string): Promise<any> {

    const data = {
        payload: {
            function: `${ABI['address']}::reward::get_reward_info` as never,
            typeArguments: [], //`${ABI['address']}::nft::NFT`
            functionArguments: [nft_id, ownerAddress],
        }
    };
    const response = await aptosClient.general.view(data);
    return response as any[];
}

export async function executeReward(signer: KeylessAccount, nft_id: string): Promise<any> {

    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::reward::execute_reward` as never,
            typeArguments: [], //`${ABI['address']}::nft::NFT`
            functionArguments: [ownerAddress, nft_id],
        }
    });
    const committedTxn = await aptosClient.signAndSubmitTransaction({
        signer: signer,
        transaction: txn,
    });
    return await aptosClient.waitForTransaction({
        transactionHash: committedTxn.hash,
    });
}