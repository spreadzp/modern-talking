module nft_addr::nft {
    use std::error;
    use std::signer;
    use std::string::{String, bytes};  // Correctly use the `bytes` function from `string` module
    use aptos_framework::object;
    use aptos_framework::event;
    use aptos_framework::table::{Self, Table};

    const ENOT_AUTHORIZED: u64 = 1;
    const ENOT_OWNER: u64 = 2;
    const ENOT_FOUND: u64 = 3;

    struct NFT has key {
        creator: address,
        owner: address,
        metadata_hash: String,
        events: NFTEventHandlers,
    }

    struct NFTEventHandlers has store {
        transfer_events: event::EventHandle<TransferEvent>,
    }

    struct TransferEvent has drop, store {
        from: address,
        to: address,
        token_id: address,
    }

    struct MetadataMap has key {
        map: Table<String, address>,
    }

    public entry fun initialize_nft(creator: &signer, metadata_hash: String) acquires MetadataMap {
        if (!exists<MetadataMap>(@nft_addr)) {
            move_to(creator, MetadataMap { map: table::new() });
        };

        // Convert metadata_hash from String to vector<u8>
        let seed_vector = *bytes(&metadata_hash);  // Use `bytes` directly
        let constructor_ref = object::create_named_object(creator, seed_vector);
        let nft_signer = object::generate_signer(&constructor_ref);
        let nft_id = object::address_from_constructor_ref(&constructor_ref);

        let nft = NFT {
            creator: signer::address_of(creator),
            owner: signer::address_of(creator),
            metadata_hash,
            events: NFTEventHandlers {
                transfer_events: object::new_event_handle(&nft_signer),
            },
        };
        move_to(&nft_signer, nft);

        let metadata_map = borrow_global_mut<MetadataMap>(@nft_addr);
        table::add(&mut metadata_map.map, metadata_hash, nft_id);
    }

    public entry fun transfer(from: &signer, to: address, token_id: address) acquires NFT {
        let nft = borrow_global_mut<NFT>(token_id);
        assert!(nft.owner == signer::address_of(from), error::permission_denied(ENOT_AUTHORIZED));

        nft.owner = to;

        let object = object::address_to_object<NFT>(token_id);
        object::transfer(from, object, to);
        event::emit_event(&mut nft.events.transfer_events, TransferEvent {
            from: signer::address_of(from),
            to,
            token_id,
        });
    }

    #[view]
    public fun exists_metadata_map(): bool {
        exists<MetadataMap>(@nft_addr)
    }

    #[view]
    public fun get_metadata_hash(token_id: address): String acquires NFT {
        let nft = borrow_global<NFT>(token_id);
        nft.metadata_hash
    }

    #[view]
    public fun get_owner_by_hash(metadata_hash: String): address acquires MetadataMap, NFT {
        let nft_id = get_nft_id_by_hash(metadata_hash);
        let nft = borrow_global<NFT>(nft_id);
        nft.owner
    }

    #[view]
    public fun get_creator(token_id: address): address acquires NFT {
        let nft = borrow_global<NFT>(token_id);
        nft.creator
    }

    #[view]
    public fun get_nft_id_by_hash(metadata_hash: String): address acquires MetadataMap {
        let metadata_map = borrow_global<MetadataMap>(@nft_addr);
        if (!table::contains(&metadata_map.map, metadata_hash)) {
            abort error::not_found(ENOT_FOUND)
        };
        *table::borrow(&metadata_map.map, metadata_hash)
    } 

    #[view]
    public fun get_owner_by_id(token_id: address): address acquires NFT {
        let nft = borrow_global<NFT>(token_id);
        nft.owner
    }
    

    #[test_only]
    public fun test_initialize_nft(creator: &signer, metadata_hash: String): address acquires MetadataMap {
        initialize_nft(creator, metadata_hash);
        get_nft_id_by_hash(metadata_hash)
    }

    #[test_only]
    public fun test_transfer(from: &signer, to: address, token_id: address) acquires NFT {
        transfer(from, to, token_id);
    }
}