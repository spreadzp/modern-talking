import { KeylessAccount } from "@aptos-labs/ts-sdk";
import * as ABI from "./abi-marketplace.json";
import { aptosClient } from "./constants";

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;

interface CoinResourceData {
    coin: {
        value: string;
    };
}

// Function to get seller listings
export async function getSellerListings(sellerAddress: string): Promise<string[]> {
    const data = {
        payload: {
            function: `${ABI['address']}::marketplace::get_seller_listings` as never,
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
            function: `${ABI['address']}::marketplace::get_sellers` as never,
            typeArguments: [],
            functionArguments: [],
        }

    };

    const response = await aptosClient.view(payload);
    return response as string[];
}

// Function to list with fixed price
export async function listWithFixedPrice(signer: KeylessAccount, nftId: string, price: number): Promise<any> {
    try {
        const txn = await aptosClient.transaction.build.simple({
            sender: signer.accountAddress.toString(),
            data: {
                function: `${ABI['address']}::marketplace::list_nft_with_fixed_price`,
                typeArguments: [`${ABI['address']}::nft::NFT`],
                functionArguments: [nftId, price],
            },
        });
        const committedTxn = await aptosClient.signAndSubmitTransaction({
            signer,
            transaction: txn,
        });
        return await aptosClient.waitForTransaction({
            transactionHash: committedTxn.hash,
        });
    } catch (error) {
        console.log("🚀 ~ error:", error)
    }

}


// Function to purchase
export async function purchase(signer: KeylessAccount, object: string): Promise<any> {

    console.log('signer.accountAddress.toString() :>>', signer.accountAddress.toString())
    const txn = await aptosClient.transaction.build.simple({    
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::marketplace::purchase`,
            typeArguments: [`${ABI['address']}::nft::NFT`], // 
            functionArguments: ['0x777f2134b93c8b3d1157c58a5047a29ba9a97104948a428e94fafbe3c6ac594f' ],
        } 
    });
const balance = await getBalance('0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97')
console.log("🚀 ~ purchase ~ balance:", balance)
const committedTxn = await aptosClient.signAndSubmitTransaction({
    signer,
    transaction: txn,
});
console.log("🚀 ~ purchase ~ committedTxn:", committedTxn)
return await aptosClient.waitForTransaction({
    transactionHash: committedTxn.hash,
});
}

async function getBalance(accountAddress: string, coinType: string = "0x1::aptos_coin::AptosCoin"): Promise<number> {
    const resources = await aptosClient.getAccountResources({ accountAddress });
    console.log("🚀 ~ getBalance ~ resources:", resources);
    const coinResource = resources.find((resource) => resource.type === `0x1::coin::CoinStore<${coinType}>`);
    console.log("🚀 ~ getBalance ~ coinResource:", coinResource);
    const coinResourceData = coinResource?.data as CoinResourceData;
    if (coinResourceData) {
        return parseInt(coinResourceData.coin.value) / 1e8;
    }
    return 0;
}

// Function to get all listing object addresses
export async function getAllListingObjectAddresses(sellerAddr: string): Promise<string[]> {
    const allListings: [string[]] = await aptosClient.view({
        payload: {
            function: `${ABI['address']}::marketplace::get_seller_listings`,
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
            function: `${ABI['address']}::marketplace::get_sellers`,
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
            function: `${ABI['address']}::marketplace::listing`,
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
export async function getListingObjectPrice(listingObjectAddr: string): Promise<number | undefined> {
    try {
        console.log("🚀 ~ getListingObjectPrice ~ listingObjectAddr:", listingObjectAddr);
        const listingObjectPrice = await aptosClient.view({
            payload: {
                function: `${ABI['address']}::marketplace::price`,
                typeArguments: [`${ABI['address']}::nft::NFT`],
                functionArguments: [listingObjectAddr],
            }
        });
        console.log("listing object price", JSON.stringify(listingObjectPrice));
        // @ts-ignore
        return (listingObjectPrice[0]["vec"] as number);
    } catch (error) {
        console.log("🚀 ~ getListingObjectPrice ~ error:", error);
        return undefined; // Explicitly return undefined in case of an error
    }
}