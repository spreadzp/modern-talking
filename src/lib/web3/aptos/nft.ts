import { KeylessAccount, InputGenerateTransactionPayloadData, TransactionWorkerEventsEnum } from "@aptos-labs/ts-sdk";
import { IndexerClient } from "aptos";
import * as ABI from "./abi-nft.json";
import { aptosClient } from "./constants";

export const APT = "0x1::aptos_coin::AptosCoin";
export const APT_UNIT = 100_000_000;



export async function mintNft(signer: KeylessAccount, uri: string): Promise<any> {

    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::nft::initialize_nft`,
            typeArguments: [],
            functionArguments: [uri],
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

export async function transferNft(signer: KeylessAccount,receiverAddress: string, nftId: string): Promise<any> {
// 0x6079fe53376605ddf06d6b99de0e6a5b05b004e196ba6a2958483673390136d3
    const txn = await aptosClient.transaction.build.simple({
        sender: signer.accountAddress.toString(),
        data: {
            function: `${ABI['address']}::nft::transfer`,
            typeArguments: [],
            functionArguments: [receiverAddress, nftId],
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


export async function getNftIdByHash(address: string, hash: string) { 
    return await aptosClient.view({
        payload: {
            function: `${ABI['address']}::nft::get_nft_id_by_hash` as never,
            typeArguments: [],
            functionArguments: [address, hash],
        }
    });

    // const data = await aptosClient.getAccountCoinsData({
    //     accountAddress: signer.accountAddress.toString()
    // })
    // console.log("🚀 ~ getNftIdByHash ~ getAccountCoinsData:", data)
    // const data1 = await aptosClient.getCollectionDataByCreatorAddress({
    //     creatorAddress: signer.accountAddress.toString()
    // })
    // console.log("🚀 ~ getNftIdByHash ~ getCollectionDataByCreatorAddress:", data1)
    // const datam = await aptosClient.getAccountModules({
    //     accountAddress: signer.accountAddress.toString()
    // })
    // console.log("🚀 ~ getNftIdByHash ~ getAccountModules:", datam)
    // const id = await aptosClient.getCollectionId({
    //     creatorAddress: signer.accountAddress.toString(),
    //     collectionName: 'My batch collection!'
    // })
    // console.log("🚀 ~ getNftIdByHash ~ getCollectionId:", id)
    // const data2 = await aptosClient.getAccountOwnedTokens({
    //     accountAddress: signer.accountAddress.toString()
    // })
    // console.log("🚀 ~ getNftIdByHash ~ getAccountOwnedTokens:", data2)
    // //  await mintCollection(signer, hash)
    // await getCollectionDataByCreatorAddress(signer)
    // const response = await aptosClient.account.getAccountResources({ accountAddress: signer.accountAddress.toString() });
    // return response;
}

export async function mintCollection(signer: KeylessAccount, hash: string) {
    const COLLECTION_NAME = "My batch collection! ABC1";
    const tokensToMint = 100;
    // const transaction = await aptosClient.createCollectionTransaction({
    //     creator: signer,
    //     description: "Batch Collection",
    //     name: COLLECTION_NAME,
    //     uri: "http://aptos.dev",
    // });
    // const pendingTxn = await aptosClient.signAndSubmitTransaction({ signer: signer, transaction });
    // await aptosClient.waitForTransaction({ transactionHash: pendingTxn.hash });
    // console.log("collection has been created");

    const payloads: InputGenerateTransactionPayloadData[] = [];

    for (let i = 0; i < tokensToMint; i += 1) {
        const payload: InputGenerateTransactionPayloadData = {
            function: "0x3::token::mint",
            functionArguments: [
                COLLECTION_NAME,
                `my ${i} token description`,
                `my ${i} token`,
                "http://aptos.dev/nft",
                [],
                [],
                [],
            ],
        };
        payloads.push(payload);
    }

    // batch mint token transactions
    aptosClient.transaction.batch.forSingleAccount({ sender: signer, data: payloads });

    aptosClient.transaction.batch.on(TransactionWorkerEventsEnum.ExecutionFinish, async (data) => {
        // log event output
        console.log(data);

        // verify account sequence number
        const account = await aptosClient.getAccountInfo({ accountAddress: signer.accountAddress });
        console.log("🚀 ~ aptosClient.transaction.batch.on ~ account:", account)
        console.log(`account sequence number is 101: ${account.sequence_number === "101"}`);

        // worker finished execution, we can now unsubscribe from event listeners
        aptosClient.transaction.batch.removeAllListeners();
        process.exit(0);
    });
    const account = await aptosClient.getAccountInfo({ accountAddress: signer.accountAddress });
    console.log("🚀 ~ aptosClient.transaction.batch.on ~ account:", account)
}

export async function getCollectionDataByCreatorAddress(signer: KeylessAccount) {
    const client = new IndexerClient(
        "https://api.testnet.aptoslabs.com/v1/graphql",
    );
    const data = await aptosClient.getAccountCoinsData({
        accountAddress: '0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6', //signer.accountAddress.toString()
    })
    console.log("🚀 ~ getNftIdByHash ~ getAccountCoinsData:", data)
    const data1 = await aptosClient.getCollectionDataByCreatorAddress({
        creatorAddress: '0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6', //signer.accountAddress.toString()
    })
    console.log("🚀 ~ getNftIdByHash ~ getCollectionDataByCreatorAddress:", data1)
    const datam = await aptosClient.getAccountModules({
        accountAddress: '0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6', //signer.accountAddress.toString()
    })
    console.log("🚀 ~ getCollectionDataByCreatorAddress ~ datam:", datam)
    const accountNFTs = await client.getTokenOwnersData(signer.accountAddress.toString());
    console.log("🚀 ~ getCollectionDataByCreatorAddress ~ getTokenOwnersData:", accountNFTs)
    const collectionsWithOwnedTokens = await client.getCollectionsWithOwnedTokens('0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6') //signer.accountAddress.toString());
    console.log("🚀 ~ getCollectionDataByCreatorAddress ~ CollectionsWithOwnedTokens:", collectionsWithOwnedTokens)
    const getAccountOwnedObjects = await client.getAccountOwnedObjects(signer.accountAddress.toString());
    console.log("🚀 ~ getCollectionDataByCreatorAddress ~ getAccountOwnedObjects:", getAccountOwnedObjects)
}