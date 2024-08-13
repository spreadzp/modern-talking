import { Aptos, APTOS_COIN, KeylessAccount } from "@aptos-labs/ts-sdk";
import { aptosClient } from "./constants";

export async function transferApt(sender: KeylessAccount, receiverAddress: string, amount: number) {
    const txn = await aptosClient.transaction.build.simple({
        sender: sender.accountAddress.toString(),
        data: {
            function: "0x1::coin::transfer",
            typeArguments: [APTOS_COIN],
            functionArguments: [receiverAddress, amount],
        },
    });
    console.log("\n=== Transfer transaction ===\n");
    const committedTxn = await aptosClient.signAndSubmitTransaction({ signer: sender, transaction: txn });
    await aptosClient.waitForTransaction({ transactionHash: committedTxn.hash });
    console.log(`Committed transaction: ${committedTxn.hash}`);
}

export async function mintTokenTransaction(signer: KeylessAccount, collectionName: string, tokenName: string, tokenDescription: string, tokenURI: string) {
//   const balance = await getBalance(signer.accountAddress.toString())
//     console.log("🚀 ~ mintTokenTransaction ~ balance:", balance)
//     const mintTokenTransaction = await aptosClient.mintDigitalAssetTransaction({
//         creator: signer, 
//         collection: collectionName,
//         description: tokenDescription,
//         name: tokenName,
//         uri: tokenURI,
//     });

//     const committedTxn = await aptosClient.signAndSubmitTransaction({
//         signer,
//         transaction: mintTokenTransaction,
//     });
//     console.log("🚀 ~ mintTokenTransaction ~ committedTxn:", committedTxn)
    const ledgerInfo = await aptosClient.getLedgerInfo();
    const ledgerVersion = ledgerInfo.ledger_version;
    const alicesCollection = await aptosClient.getAccountModules({
        accountAddress: '0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97',//signer.accountAddress,
        //collectionAddress: '0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97'
       // collectionName,
        //minimumLedgerVersion: BigInt(ledgerVersion),
    });
    console.log('alicesCollection.length :>>', alicesCollection.length)
    console.log(`Alice's collection: ${JSON.stringify(alicesCollection[1].abi, null, 4)}`);
}

export async function getBalance(accountAddress: string) {
    const ledgerInfo = await aptosClient.getLedgerInfo();
    const ledgerVersion = ledgerInfo.ledger_version;
    // const alicesDigitalAsset = await aptosClient.getAccountCollectionsWithOwnedTokens({
    //     accountAddress: '0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97',
    //     minimumLedgerVersion: BigInt(ledgerVersion),
    // });

    // console.log(
    //     `@@@@@@@@@@@@Alice's digital asset: ${JSON.stringify(alicesDigitalAsset[0], null, 4)}`,
    // );
    return await aptosClient.getAccountCoinsData({
        accountAddress,
        minimumLedgerVersion: BigInt(ledgerVersion),
    });

}

export async function fundTestAptAccount(receiver: string) {
    const transaction = await aptosClient.fundAccount({
        accountAddress: receiver,
        amount: 300000000,
    });
    console.log("🚀 ~ fundTestAptAccount ~ transaction:", transaction)
}