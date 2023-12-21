const State = require("../state");
const Transaction = require('../transaction');
const Wallet = require('../wallet');
const Block = require('../block');
const Blockchain = require('../blockchain');

// Creating two wallets
const alice = Wallet.create();
const bob = Wallet.create();

// Creating blockchain and mining first empty reward block
const chain = new Blockchain();
chain.mine(bob.publickey);

// Check balance (must be bob: 50 and alice: 0)
console.log("Bob: ", chain.baln(bob.publickey)); // 50
console.log("Alice: ", chain.baln(alice.publickey)); // 0

// Mine new block with transaction to alice
chain.mine(bob.publickey, [
    new Transaction({
        from: bob.publickey,
        to: alice.publickey,
        value: 10,
        nounce: 0,
    }).sign(bob.privatekey)
]);

// Check balance again (must be bob: 40 and alice: 10)
console.log("Bob: ", chain.baln(bob.publickey)); // 40
console.log("Alice: ", chain.baln(alice.publickey)); // 10