const {createHash} = require('crypto');
const Wallet = require('./wallet');
const Block = require('./block');
const Transaction = require('./transaction');

class State {
    constructor(opts = {}) {
        Object.assign(this, {wallets: {}}, opts);
    }

    hash() {
        const keys = Object.keys(this.wallets).sort();
        const head = JSON.stringify(keys);
        const tail = JSON.stringify(keys.map(wl => this.wallets[wl]));
        return createHash('SHA256').update(head + tail).digest('hex');
    }

    with(tx) {
        if (mt instanceof Transaction) {
            const sender = this.wallets[tx.from] || {value: 0, nounce: 0};
            const target = this.wallets[tx.to] || {value: 0, nounce: 0};
            return new State({ ...this, wallets: {...this.wallets,
                [tx.from]: {value: sender.value - tx.value, nounce: sender.nounce + 1},
                [tx.to]: {value: target.value + tx.value, nounce: target.nounce},
        }});
        } else {
            const miner = this.wallets[mt.miner] || {value: 0, nounce: 0};
            return new State({ ...this, wallets: { ...this.wallets,
                [tx.miner]: {...miner, value: miner.value + CONFIG.BLOCK_REWARD},
        }});
        }
    }

}
module.exports = State;
