#[test_only]
module marketplace_addr::test_marketplace {
    use std::string;
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::object;
    use nft_addr::nft;

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
        let creator_addr = signer::address_of(creator);
        let recipient_addr = signer::address_of(recipient);
        account::create_account_for_test(creator_addr);
        account::create_account_for_test(recipient_addr);

        let metadata = string::utf8(b"https://example.com/nft3");
        let token_id = nft::test_initialize_nft(creator, metadata);

        // Transfer the NFT
        nft::test_transfer(creator, recipient_addr, token_id);

        // Verify the transfer
        let object = object::address_to_object<nft::NFT>(token_id);
        assert!(object::owner(object) == recipient_addr, 0);
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
}