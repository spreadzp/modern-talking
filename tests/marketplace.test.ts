import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";

describe("Marketplace Module Tests", () => {
    let client: Aptos;
    let seller: Account;
    let buyer: Account;
    const ABI = {
        address: "0xd348822abc4c50a68be8be6382f1883deeb365bf54367791ab9ed584f67b9cc6"
    };

    beforeAll(async () => {
        const APTOS_NETWORK: Network = Network.TESTNET;
        const config = new AptosConfig({ network: APTOS_NETWORK });
        client = new Aptos(config);

        const privateKeySeller = new Ed25519PrivateKey(process.env.TEST_BOB_PK as string);
        seller = Account.fromPrivateKey({ privateKey: privateKeySeller });

        const privateKeyBuyer = new Ed25519PrivateKey(process.env.TEST_ALICE_PK as string);
        buyer = Account.fromPrivateKey({ privateKey: privateKeyBuyer });
    });

    test("List NFT with Fixed Price", async () => {
        const nftAddress = "0xsomeaddress"; // Replace with actual NFT address
        const price = 1000000; // 1 APT (assuming 1 APT = 1_000_000 microAPT)

        const txn = await client.transaction.build.simple({
            sender: seller.accountAddress.toString(),
            data: {
                function: `${ABI.address}::marketplace::list_nft_with_fixed_price`,
                typeArguments: [],
                functionArguments: [nftAddress, price.toString()],
            },
        });

        const committedTxn = await client.transaction.simulate.simple({
            signerPublicKey: seller.publicKey,
            transaction: txn,
        });
        console.log("🚀 ~ test ~ committedTxn:", committedTxn)

        // await client.waitForTransaction({
        //     transactionHash: committedTxn.,
        // });

        // Add logic to verify NFT listing
        // Example: Retrieve listing details and verify price and seller
    });

    test("Get NFT Listing", async () => {
        const nftAddress = "0xsomeaddress"; // Replace with actual NFT address

        const listing = await client.view({
            payload: {
            function: `${ABI.address}::marketplace::get_nft_listing`,
            typeArguments: [],
            functionArguments: [nftAddress],
        }});
        console.log("🚀 ~ test ~ listing:", listing)

        
        // Example: expect(listing.price).toBe(1000000);
    });

    test("Get Seller Listings", async () => {
        const sellerAddress = seller.accountAddress.toString();

        const listings = await client.view({
            payload: {
            function: `${ABI.address}::marketplace::get_seller_listings`,
            typeArguments: [],
            functionArguments: [sellerAddress],
        }});
        console.log("🚀 ~ test ~ listings:", listings)

      
        // Example: expect(listings).toContain(nftAddress);
    });

    test("Purchase NFT", async () => {
        const nftAddress = "0xsomeaddress"; // Replace with actual NFT address

        const txn = await client.transaction.build.simple({
            sender: buyer.accountAddress.toString(),
            data: {
                function: `${ABI.address}::marketplace::purchase`,
                typeArguments: [],
                functionArguments: [nftAddress],
            },
        });

        const committedTxn = await client.transaction.simulate.simple({
            signerPublicKey: seller.publicKey,
            transaction: txn,
        });
        console.log("🚀 ~ test ~ committedTxn:", committedTxn)

        // Add logic to verify NFT purchase
        // Example: Retrieve NFT details and verify new owner
    });

    test("Get Sellers", async () => {
        const sellers = await client.view({
            payload: {
            function: `${ABI.address}::marketplace::get_sellers`,
            typeArguments: [],
            functionArguments: [],
        }});

        // Add assertions to verify sellers
        // Example: expect(sellers).toContain(seller.accountAddress.toString());
    });

    // Add more tests as needed...
});
