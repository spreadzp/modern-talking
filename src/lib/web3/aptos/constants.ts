// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0

import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export const LocalStorageKeys = {
  keylessAccounts: "@aptos-connect/keyless-accounts",
};

export const aptosClient = new Aptos(
  new AptosConfig({
    network: Network.TESTNET 
  })
);

/// TODO: Put your client id here
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string //"718925344899-mrh41bevtaukhp6amnq1rs685uuq9q22.apps.googleusercontent.com";