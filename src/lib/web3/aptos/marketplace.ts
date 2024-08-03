import { Aptos, AptosConfig, Network, Account, KeylessAccount } from "@aptos-labs/ts-sdk";
import * as ABI from "./abi.json";
import { aptosClient } from "./constants";

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;



// Function to get seller listings
export async function getSellerListings(sellerAddress: string): Promise<string[]> {
    const data = {
        payload: {
            function: `${ABI.address}::marketplace::get_seller_listings` as never,
            typeArguments: [],
            arguments: [sellerAddress],
        }

    };

    const response = await aptosClient.view(data);
    return response as string[];
}

// Function to get sellers
export async function getSellers(): Promise<string[]> {
    const payload = {
        payload: {
            function: `${ABI.address}::marketplace::get_sellers` as never,
            typeArguments: [],
            functionArguments: [],
        }

    };

    const response = await aptosClient.view(payload);
    return response as string[];
}

// Function to list with fixed price
export async function listWithFixedPrice(signer: KeylessAccount, object: string, price: number): Promise<any> {

    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI.address}::marketplace::list_with_fixed_price`,
            typeArguments: [],
            functionArguments: [object, price],
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


// Function to purchase
export async function purchase(signer: KeylessAccount, object: string): Promise<any> {


    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI.address}::marketplace::purchase`,
            typeArguments: [],
            functionArguments: [object],
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

// Function to get all listing object addresses
export async function getAllListingObjectAddresses(sellerAddr: string): Promise<string[]> {
    const allListings: [string[]] = await aptosClient.view({
        payload: {
            function: `${ABI.address}::marketplace::get_seller_listings`,
            typeArguments: [],
            functionArguments: [sellerAddr],
        }

    });
    console.log("all listings", allListings);
    return allListings[0];
}

// Function to get all sellers
export async function getAllSellers(): Promise<string[]> {
    const allSellers: [string[]] = await aptosClient.view({
        payload: {
            function: `${ABI.address}::marketplace::get_sellers`,
            typeArguments: [],
            functionArguments: [],
        }

    });
    console.log("all sellers", allSellers);
    return allSellers[0];
}

// Function to get listing object and seller
export async function getListingObjectAndSeller(listingObjectAddr: string): Promise<[string, string]> {
    const listingObjectAndSeller = await aptosClient.view({
        payload: {
            function: `${ABI.address}::marketplace::listing`,
            typeArguments: [],
            functionArguments: [listingObjectAddr],
        }

    });
    console.log("listing object and seller", listingObjectAndSeller);
    return [
        // @ts-ignore
        listingObjectAndSeller[0]["inner"] as string,
        listingObjectAndSeller[1] as string,
    ];
}

// Function to get listing object price
export async function getListingObjectPrice(listingObjectAddr: string): Promise<number> {
    const listingObjectPrice = await aptosClient.view({
        payload: {
            function: `${ABI.address}::marketplace::price`,
            typeArguments: [APT],
            functionArguments: [listingObjectAddr],
        }

    });
    console.log("listing object price", JSON.stringify(listingObjectPrice));
    // @ts-ignore
    return (listingObjectPrice[0]["vec"] as number) / APT_UNIT;
}