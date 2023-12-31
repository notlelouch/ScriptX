const Transaction = require('../transaction');
const Wallet = require('../wallet');
const Blockchain = require('../blockchain');

// Create wallets:
const alice = Wallet.create();
const bob = Wallet.create();

// Create blockchain and mine first empty reward block:
const chain = new Blockchain();
chain.mine(bob.publicKey);

// Check balance (must be Bob: 50 and Alice: 0):
console.log("Bob: ", chain.baln(bob.publicKey));
console.log("Alice: ", chain.baln(alice.publicKey)); 

// Mine new block with transaction to Alice:
chain.mine(bob.publicKey, [
    new Transaction({
        from: bob.publicKey,
        to: alice.publicKey,
        value: 15,
        nounce: 0,
    }).sign(bob.privateKey),
]);

// Check balance again (must be Bob: 85 and Alice: 15):
console.log("Bob: ", chain.baln(bob.publicKey)); 
console.log("Alice: ", chain.baln(alice.publicKey));