const Transaction = require('../transaction');
const Wallet = require('../wallet');
const {createHash, createECDH, createSign, createVerify} = require('crypto');

const bob = Wallet.create();
const alice = Wallet.create();

// Making a valid transaction
const transactionOne = new Transaction({
    from: bob.publicKey,
    to: alice.publicKey,
    nounce: 0,
    value: 15
}).sign(bob.privateKey);

// Making a invalid transaction with a fraud signature
const transactionTwo = new Transaction({
    from: bob.publicKey,
    to: alice.publicKey,
    nounce: 0,
    value: 15
}).sign(alice.privateKey);

// Making a invalid transaction without a signature
const transactionThree = new Transaction({
    from: bob.publicKey,
    to: alice.publicKey,
    nounce: 0,
    value: 15
});

// Checking status
console.log('Transaction #1 status: ' + transactionOne.test())
console.log('Transaction #2 status: ' + transactionTwo.test())
console.log('Transaction #3 status: ' + transactionThree.test())

// Expected results: true, flase, false

