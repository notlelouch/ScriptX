const Wallet = require('../wallet');
const Block = require('../block');
const Transaction = require('../transaction');
const {createHash, createECDH, createSign, createVerify} = require('crypto');

const bob = Wallet.create();
const alice = Wallet.create();

// Dummy chain
const blockchain = []

// Pushing genesis block into the chain
blockchain.push(
    new Block({
        parentHash: null,
        stateHash: null,
        miner: bob.publicKey,
        transactions: [],
    }).mine()
);

// Block hash must start from two zero
console.log(blockchain[0].hash());

// Pushing second block into the chain, linked with the previous one
blockchain.push(
    new Block({
        parentHash: blockchain[blockchain.length -1].hash(),
        stateHash: null,
        miner: bob.publicKey,
        transactions: [
            new Transaction({
                from: bob.publicKey,
                to: alice.publicKey,
                value: 15,
                nounce: 0,
            }).sign(bob.privateKey),
        ]
    }).mine()
);

// Block hash must start from two zeroes
console.log(blockchain[1].hash());

