const State = require("../state");
const Transaction = require('../transaction');
const Wallet = require('../wallet');
const Block = require('../block');
const {createHash, createECDH, createSign, createVerify} = require('crypto');

let state = new State();
state = state.with(new Block({miner: 'bob'}));
state = state.with(new Transaction({from: 'bob', to: 'alice', value: 15, nounce: 0}));
console.log(state);