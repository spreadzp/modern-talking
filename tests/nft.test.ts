import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";

describe("NFT Module Tests", () => {
    let client: Aptos;
    let creator: Account;
    let recipient: Account;
    const ABI = {
        address: "0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97"
    };

    beforeAll(async () => {
        const APTOS_NETWORK: Network = Network.TESTNET;
        const config = new AptosConfig({ network: APTOS_NETWORK });
        client = new Aptos(config);

        const privateKeyCreator = new Ed25519PrivateKey(process.env.TEST_BOB_PK as string);
        creator = Account.fromPrivateKey({ privateKey: privateKeyCreator });

        const privateKeyRecipient = new Ed25519PrivateKey(process.env.TEST_ALICE_PK as string);
        recipient = Account.fromPrivateKey({ privateKey: privateKeyRecipient });
    });

    test("Initialize NFT", async () => {
        const metadata = `https://example.com/nft1?unique=${Date.now()}`; // Ensure unique metadata

        const txn = await client.transaction.build.simple({
            sender: creator.accountAddress.toString(),
            data: {
                function: `${ABI.address}::nft::initialize_nft`,
                typeArguments: [],
                functionArguments: [metadata],
            },
        });

        const committedTxn = await client.signAndSubmitTransaction({
            signer: creator,
            transaction: txn,
        });

        await client.waitForTransaction({
            transactionHash: committedTxn.hash,
        });

        // Add logic to verify NFT creation
        // Example: Retrieve NFT details and verify metadata
    });

    test("Transfer NFT", async () => {
        const metadata = `https://example.com/nft2?unique=${Date.now()}`; // Ensure unique metadata

        const initTxn = await client.transaction.build.simple({
            sender: creator.accountAddress.toString(),
            data: {
                function: `${ABI.address}::nft::initialize_nft`,
                typeArguments: [],
                functionArguments: [metadata],
            },
        });

        const committedInitTxn = await client.signAndSubmitTransaction({
            signer: creator,
            transaction: initTxn,
        });

        await client.waitForTransaction({
            transactionHash: committedInitTxn.hash,
        });

        // Assuming the NFT ID is derived from the transaction hash or a similar unique identifier
        const nftId = committedInitTxn.hash; // Use a unique identifier for the NFT

        // Verify NFT ownership before transferring
        const verifyTxn = await client.transaction.build.simple({
            sender: creator.accountAddress.toString(),
            data: {
                function: `${ABI.address}::nft::verify_nft_ownership`,
                typeArguments: [],
                functionArguments: [creator.accountAddress.toString(), nftId],
            },
        });

        await client.signAndSubmitTransaction({
            signer: creator,
            transaction: verifyTxn,
        });

        const transferTxn = await client.transaction.build.simple({
            sender: creator.accountAddress.toString(),
            data: {
                function: `${ABI.address}::nft::transfer`,
                typeArguments: [],
                functionArguments: [recipient.accountAddress.toString(), nftId],
            },
        });

        const committedTransferTxn = await client.signAndSubmitTransaction({
            signer: creator,
            transaction: transferTxn,
        });

        await client.waitForTransaction({
            transactionHash: committedTransferTxn.hash,
        });

        // Add logic to verify the NFT transfer
        // Example: Retrieve NFT details and verify the new owner
    });

    // Add more tests as needed...
});