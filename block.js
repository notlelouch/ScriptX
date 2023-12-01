const {createHash, createECDH, createSign, createVerify} = require('crypto');
const CONFIG = exports.CONFIG = ({BLOCK_DIFFICULTY: 2});

class Block {
    constructor(opts = {}) {
        Object.assign(this, {
            parentHash: null, stateHash: null, miner: null, nounce: 0, transactions: []
        }, opts);   
    }

    hash() {
        const head = JSON.stringify(this,['parentHash', 'stateHash', 'miner', 'nounce']);
        const tail = JSON.stringify(this.transactions.map(tx => tx.hash()));
        return createHash('SHA256').update(head + tail).digest('hex');
    }

    mine(min = 0, max = Number.MAX_SAFE_INTEGER) {
        for (let nounce = min; nounce < max; nounce++) {
            const block = new Block({...this, nounce});
            if (block.test()) return block;
        }
    }

    test() {
        const mask = '0'.repeat(CONFIG.BLOCK_DIFFICULTY);
        return this.hash().startsWith(mask);
    }
}

module.exports = Block;