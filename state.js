const {createHash} = require('crypto');
const Transaction = require('./transaction');
const CONFIG = exports.CONFIG = ({BLOCK_DIFFICULTY: 2, BLOCK_REWARD: 50});

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

    with(mt) {
// if a transaction is taking place.
        if (mt instanceof Transaction) {
            const sender = this.wallets[mt.from] || {value: 0, nounce: 0};
            const target = this.wallets[mt.to] || {value: 0, nounce: 0};
            return new State({ ...this, wallets: {...this.wallets,
                [mt.from]: {value: sender.value - mt.value, nounce: sender.nounce + 1},
                [mt.to]: {value: target.value + mt.value, nounce: target.nounce},
        }});
// if a mining reward or non-transation has taken place.
        } else {
            const miner = this.wallets[mt.miner] || {value: 0, nounce: 0};
            return new State({ ...this, wallets: { ...this.wallets,
                [mt.miner]: {...miner, value: miner.value + CONFIG.BLOCK_REWARD},
        }});
        }
    }

}
module.exports = State;
