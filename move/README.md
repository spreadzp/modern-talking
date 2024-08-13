## Env setup

Check out the guide from [Aptos Learn](https://learn.aptoslabs.com/example/aptogotchi-beginner/env-setup).

## Play with testnet deployments on explorer

Go to testnet explorer [here](https://explorer.aptoslabs.com/?network=testnet) and search for the contract address.

You can find the contract address in each contract directory's `contract_address.txt`.

On explorer, you can read the contract code, call entry functions (need to connect wallet), and call view functions.

## Development

In each contract's `move` directory, you can run below commands.

Run unit test
# Initialize the Aptos CLI and create a profile
aptos init --profile testnet-profile-1

# Verify the profile configuration
aptos config show-profiles --profile testnet-profile-1

```sh
aptos move compile --package-dir move/sources/marketplace.move --dev
aptos move compile --package-dir move --dev
./sh_scripts/test.sh
```

Deploy to testnet
aptos move publish --package-dir move/sources --profile testnet-profile-1 --assume-yes
aptos move publish --package-dir move/sources --named-addresses marketplace_addr=0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97,nft_addr=0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97 --profile testnet-profile-1 --assume-yes
```sh
./sh_scripts/deploy.sh
```

Upgrade deployed contract

```sh
./sh_scripts/upgrade.sh
```

Run Move scripts. Move scripts are off-chain Move functions that let you call multiple functions atomically 

```sh
# You can explorer what other scripts are available in sh_scripts
./sh_scripts/create_and_mint_some_fas.sh
```
https://explorer.aptoslabs.com/txn/0x25a51d28634b5d1974f3f44f260d25d46b26498bbac711b56ff58650520582a4?network=testnet

https://aptoscan.com/module/0xd80f67b134fa1bead50678184c4550a59f90349ed004184f995916cd1dd93a97/marketplace?network=testnet  => ABI