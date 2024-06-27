 
import { ethers  } from "ethers";
 

export function createMnemonicFromString(inputString: string ) {
    // Use the input string to create a mnemonic phrase
    // This is a simple example and may not be secure for production use
    const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.toUtf8Bytes(inputString));
    return mnemonic;
  }
  
  // Function to create an Ethereum account from a mnemonic
  export function createAccountFromMnemonic(mnemonic: string ) {
    // Create a wallet from the mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    return wallet;
  } 

export function createWalletPrivateKey(privateKey: string) {
    try {
        return new ethers.Wallet(privateKey);
    } catch (error) {
        console.error("Error creating account:", error);
        return null;
    }
}

// Function to create a private key from a hash
export function createPrivateKeyFromHash(mnemonicObj: any) {
    try {
        const privateKey = ethers.Wallet.fromMnemonic(mnemonicObj.mnemonic.phrase);
        return privateKey;
    } catch (error) {
        console.error("Error creating private key:", error);
        return null;
    }
}

// Function to create a hash for a private key from a string
export function createHashForPrivateKeyFromString(inputString: string) {
    const buffByteLike = fromStringToHash(inputString);
    const mnemonic = ethers.utils.entropyToMnemonic(buffByteLike);
    try {
        const hash = ethers.Wallet.fromMnemonic(mnemonic);
        return hash;
    } catch (error) {
        console.error("Error creating hash:", error);
        return null;
    }
}

export function fromStringToHash(inputString: string) {
    const buffByteLike = ethers.utils.id(inputString);
    return buffByteLike;
}

 

export function lengthMore128Chars(str: string) {
    // Check if the string length is less than 128
    if (str.length < 128) {
        // Calculate how many characters are needed to reach 128
        const additionalCharsNeeded = 128 - str.length;
        // Create a string of '0's with the required length
        const additionalChars = "0".repeat(additionalCharsNeeded);
        // Concatenate the original string and the additional characters
        return str + additionalChars;
    } else if (str.length === 128) {
        // If the string length is already 128, return it as is
        return str;
    } else {
        // If the string length is greater than 128, return the original string
        return str;
    }
}
 
 

export function shortenEthAddress(address: string) {
    // Check if the address is a valid Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        throw new Error("Invalid Ethereum address");
    }

    // Shorten the address
    const shortenedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
    return shortenedAddress;
}