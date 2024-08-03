module nft_addr::nft {
    use std::error;
    use std::signer;
    use std::string::{Self, String};
    use aptos_framework::object;
    use aptos_framework::event;
    use aptos_framework::table::{Self, Table};

    const ENOT_AUTHORIZED: u64 = 1;
    const ENOT_OWNER: u64 = 2;
    const ENOT_FOUND: u64 = 3;

    struct NFT has key {
        creator: address,
        metadata: String,
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

    public entry fun initialize_nft(creator: &signer, metadata: String) acquires MetadataMap {
        let seed = string::utf8(b"NFT");
        string::append(&mut seed, metadata);
        let constructor_ref = object::create_named_object(creator, *string::bytes(&seed));
        let nft_signer = object::generate_signer(&constructor_ref);
        let nft_id = object::address_from_constructor_ref(&constructor_ref);
        
        let nft = NFT {
            creator: signer::address_of(creator),
            metadata,
            events: NFTEventHandlers {
                transfer_events: object::new_event_handle(&nft_signer),
            },
        };
        move_to(&nft_signer, nft);

        let creator_addr = signer::address_of(creator);
        if (!exists<MetadataMap>(creator_addr)) {
            let map = table::new();
            move_to(creator, MetadataMap { map });
        };
        let metadata_map = borrow_global_mut<MetadataMap>(creator_addr);
        table::add(&mut metadata_map.map, metadata, nft_id);
    }

    public entry fun transfer(from: &signer, to: address, token_id: address) acquires NFT {
        let nft = borrow_global_mut<NFT>(token_id);
        assert!(nft.creator == signer::address_of(from), error::permission_denied(ENOT_AUTHORIZED));
        let object = object::address_to_object<NFT>(token_id);
        object::transfer(from, object, to);
        event::emit_event(&mut nft.events.transfer_events, TransferEvent {
            from: signer::address_of(from),
            to,
            token_id,
        });
    }

    public fun exists_metadata_map(creator: address): bool {
        exists<MetadataMap>(creator)
    }

    public fun get_metadata(token_id: address): String acquires NFT {
        let nft = borrow_global<NFT>(token_id);
        nft.metadata
    }

    public fun get_creator(token_id: address): address acquires NFT {
        let nft = borrow_global<NFT>(token_id);
        nft.creator
    }

    public fun get_nft_id_by_hash(creator: address, metadata: String): address acquires MetadataMap {
        if (!exists<MetadataMap>(creator)) {
            abort error::not_found(ENOT_FOUND)
        };
        let metadata_map = borrow_global<MetadataMap>(creator);
        if (!table::contains(&metadata_map.map, metadata)) {
            abort error::not_found(ENOT_FOUND)
        };
        *table::borrow(&metadata_map.map, metadata)
    }

    #[test_only]
    public fun test_initialize_nft(creator: &signer, metadata: String): address acquires MetadataMap {
        initialize_nft(creator, metadata);
        let creator_addr = signer::address_of(creator);
        let metadata_map = borrow_global<MetadataMap>(creator_addr);
        *table::borrow(&metadata_map.map, metadata)
    }

    #[test_only]
    public fun test_transfer(from: &signer, to: address, token_id: address) acquires NFT {
        transfer(from, to, token_id);
    }
}