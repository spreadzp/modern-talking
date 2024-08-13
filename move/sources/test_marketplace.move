#[test_only]
module marketplace_addr::test_marketplace { 
    use std::signer;  
    use std::string::{Self};
    use aptos_framework::account;
    use aptos_framework::object; 
    use aptos_framework::coin;
    use aptos_framework::aptos_coin;
    use aptos_framework::aptos_coin::AptosCoin; 
    use aptos_framework::option;
    use nft_addr::nft;
    use marketplace_addr::marketplace;

    // Temporary resource to hold capabilities
    struct Capabilities has store {
        burn_cap: coin::BurnCapability<AptosCoin>,
        mint_cap: coin::MintCapability<AptosCoin>,
    }

    // Define the drop method for Capabilities
    fun destroy_capabilities(self: Capabilities) {
        let Capabilities { burn_cap, mint_cap } = self;
        // Explicitly destroy the burn and mint capabilities
        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }

    // Helper function to setup accounts for testing
    public fun setup_accounts(creator: &signer, purchaser: &signer) {
        account::create_account_for_test(signer::address_of(creator));
        account::create_account_for_test(signer::address_of(purchaser));
    }

    // Initialize AptosCoin for testing
    public fun setup_aptos_coin(account: &signer) {
        let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(account);
        // Store capabilities in a temporary resource
        let caps = Capabilities { burn_cap, mint_cap };
        // Explicitly destroy the resource to destroy the capabilities
        destroy_capabilities(caps);
    }

    // Test minting (initializing) an NFT
    #[test(creator = @0x1)]
    public entry fun test_mint_nft(creator: &signer) {
        account::create_account_for_test(signer::address_of(creator));

        let metadata = string::utf8(b"https://example.com/nft1");
        let token_id = nft::test_initialize_nft(creator, metadata);

        assert!(nft::get_creator(token_id) == signer::address_of(creator), 0);
        assert!(nft::get_metadata(token_id) == metadata, 1);
    }

    // Test metadata mapping
    #[test(creator = @0x1)]
    public entry fun test_metadata_mapping(creator: &signer) {
        account::create_account_for_test(signer::address_of(creator));

        let metadata = string::utf8(b"https://example.com/nft2");
        let token_id = nft::test_initialize_nft(creator, metadata);

        let creator_addr = signer::address_of(creator);
        let retrieved_token_id = nft::get_nft_id_by_hash(creator_addr, metadata);
        assert!(retrieved_token_id == token_id, 0);
    }

    // Test transferring an NFT
    #[test(creator = @0x1, recipient = @0x2)]
    public entry fun test_transfer_nft(creator: &signer, recipient: &signer) {
        setup_accounts(creator, recipient);

        let metadata = string::utf8(b"https://example.com/nft3");
        let token_id = nft::test_initialize_nft(creator, metadata);

        // Transfer the NFT
        nft::test_transfer(creator, signer::address_of(recipient), token_id);

        // Verify the transfer
        let object = object::address_to_object<nft::NFT>(token_id);
        assert!(object::owner(object) == signer::address_of(recipient), 0);
    }

    // Test minting multiple NFTs
    #[test(creator = @0x1)]
    public entry fun test_mint_multiple_nfts(creator: &signer) {
        account::create_account_for_test(signer::address_of(creator));

        let metadata1 = string::utf8(b"https://example.com/nft4");
        let metadata2 = string::utf8(b"https://example.com/nft5");

        let token_id1 = nft::test_initialize_nft(creator, metadata1);
        let token_id2 = nft::test_initialize_nft(creator, metadata2);

        assert!(token_id1 != token_id2, 0);
        assert!(nft::get_metadata(token_id1) == metadata1, 1);
        assert!(nft::get_metadata(token_id2) == metadata2, 2);
    }

    // Test retrieving non-existent NFT
    #[test(creator = @0x1)]
    #[expected_failure(abort_code = 393219, location = nft_addr::nft)]
    public entry fun test_get_non_existent_nft(creator: &signer) {
        account::create_account_for_test(signer::address_of(creator));

        let non_existent_metadata = string::utf8(b"https://example.com/non_existent");
        let _token_id = nft::get_nft_id_by_hash(signer::address_of(creator), non_existent_metadata);
    }

    #[test(creator = @0x1, purchaser = @0x2, marketplace = @marketplace_addr)]
    public entry fun test_list_nft_with_fixed_price(creator: &signer, purchaser: &signer, marketplace: &signer) {
        setup_accounts(creator, purchaser);
        setup_aptos_coin(marketplace);

        let metadata = string::utf8(b"https://example.com/nft6");
        let token_id = nft::test_initialize_nft(creator, metadata);

        marketplace::setup_test(marketplace);

        let price = 100;
        marketplace::list_nft_with_fixed_price(creator, token_id, price);

        let listing_id = marketplace::get_nft_listing(token_id);
        let listing_price = marketplace::price(object::address_to_object(listing_id));

        assert!(option::contains(&listing_price, &price), 0);
    }

    // Test purchasing an NFT from a fixed price listing
    #[test(creator = @0x1, purchaser = @0x2, marketplace = @marketplace_addr)]
    public entry fun test_purchase_nft(creator: &signer, purchaser: &signer, marketplace: &signer) {
        setup_accounts(creator, purchaser);
        setup_aptos_coin(marketplace);

        let metadata = string::utf8(b"https://example.com/nft7");
        let token_id = nft::test_initialize_nft(creator, metadata);

        marketplace::setup_test(marketplace);

        let price = 100;
        marketplace::list_nft_with_fixed_price(creator, token_id, price);

        let listing_id = marketplace::get_nft_listing(token_id);

        // Fund the purchaser account with enough coins to buy the NFT
        let mint_amount = 1000;
        coin::register<AptosCoin>(purchaser);
        aptos_coin::mint(purchaser, signer::address_of(purchaser), mint_amount);

        // Purchase the NFT
        let object = object::address_to_object(listing_id);
        marketplace::purchase(purchaser, object);

        // Verify the transfer
        let nft_object = object::address_to_object<nft::NFT>(token_id);
        assert!(object::owner(nft_object) == signer::address_of(purchaser), 0);
    }

    #[test(creator = @0x1, purchaser = @0x2, marketplace = @marketplace_addr)]
    #[expected_failure(abort_code = 65539, location = marketplace_addr::marketplace)]
    public entry fun test_purchase_nft_insufficient_balance(creator: &signer, purchaser: &signer, marketplace: &signer) {
        setup_accounts(creator, purchaser);
        setup_aptos_coin(marketplace);

        let metadata = string::utf8(b"https://example.com/nft8");
        let token_id = nft::test_initialize_nft(creator, metadata);

        marketplace::setup_test(marketplace);

        let price = 100;
        marketplace::list_nft_with_fixed_price(creator, token_id, price);

        let listing_id = marketplace::get_nft_listing(token_id);

        // Fund the purchaser account with insufficient coins to buy the NFT
        let mint_amount = 50; // Less than the price
        coin::register<AptosCoin>(purchaser);
        aptos_coin::mint(purchaser, signer::address_of(purchaser), mint_amount);

        // Attempt to purchase the NFT (should fail)
        let object = object::address_to_object(listing_id);
        marketplace::purchase(purchaser, object);
    }
}
