# Scriptx

## Introduction

Meet ScriptX, a powerful blockchain implementation. ScriptX offers essential features like straightforward wallet creation, simplified transaction management (including signing and verification), and the capacity to organize transactions into blocks for mining. ScriptX also adeptly tracks state changes, providing clear information for a smooth experience.

## Features

- **Wallet Creation:** Generate secure public-private key pairs for wallet management.
- **Transaction Handling:** Sign and verify transactions securely using cryptographic functions.
- **Block Mining:** Mine blocks with proof-of-work and validate transactions for added security.
- **State Tracking:** Keep track of wallet balances and nonce values for seamless transaction processing.

## Installation & Usage

Clone the repository:

Clone the repository:

   ```bash
    git clone https://github.com/<your-username>/ScriptX.git
   ```

## Usage

Now you can write some simple blockchain interactions:

``` javascript

// Create wallets:
const alice = Wallet.create();
const bob   = Wallet.create();

// Create blockchain and mine first empty reward block:
const chain = new Blockchain();
chain.mine(bob.publicKey);

// Check balance (must be Bob: 50 and Alice: 0):
console.log('Bob:',   chain.baln(bob  .publicKey));
console.log('Alice:', chain.baln(alice.publicKey));

// Mine new block with transaction to Alice:
chain.mine(bob.publicKey, [
    new Transaction({
        from:  bob  .publicKey,
        to:    alice.publicKey,
        value: 15,
        nonce: 0,
    }).sign(bob.privateKey),
]);

// Check balance again (must be Bob: 85 and Alice: 15):
console.log('Bob:',   chain.baln(bob  .publicKey));
console.log('Alice:', chain.baln(alice.publicKey));
```

**Note:** ScriptX is based on fundamental blockchain principles and is intended for educational purposes. It is not recommended for production use.

## Tests

Explore the functionality and ensure the correctness of the library by running the provided tests:

- [test-block.js](test/test-block.js)
- [test-blockchain.js](test/test-blockchain.js)
- [test-state.js](tests/tes-state.js)
- [test-transaction.js](test/test-transaction.js)
- [test-wallet.js](test/test-wallet.js)
- [testing-ScriptX.js](test/testing-ScriptX.js)


## Contributing

Contributions are welcome! If you have ideas for improvements, new features, or bug fixes, please open an issue or submit a pull request.
