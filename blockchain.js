const Block = require('./block');
const State = require('./state');

class Blockchain {
    constructor(opts={}) {
        Object.assign(this, {
            state: new State(), blocks: new Array()
        }, opts);
    }

    static verifyTrsnsaction(prev, state, tx){
        const sender = state.wallets[tx.from] || {value: 0};
        if (tx.value <= 0 || sender.value < tx.value) throw Error('Bad value.');
        if (tx.nounce < 0 || sender.nounce > tx.nounce) throw Error('Bad nounce.');
        if (prev && prev.nounce > tx.nounce) throw Error('Bad nounce order.');
        if (!tx.test()) throw Error('transaction is not signed properly.');
        return state.with(tx);
    }

    static verifyBlock(prev, state, block) {
        if (prev && block.parentHash !== prev.hash()) throw Error('Bad parentHash');
        if (prev && block.stateHash !== state.hash()) throw Error('Bad stateHash');
        if (!block.test()) throw Error('Block is not mined porperly');
        return block.transactions.reduce((state, tx, index) => {
            const prev = block.transactions[index - 1] || (null);
            return Blockchain.verifyTrsnsaction(prev, state, tx)
        }, state.with(block));
    }

    baln(address) {
        if (!this.state.wallets[address]) return (0);
        return this.state.wallets[address].value;
    }

    push(block) {
        const prev = (this.blocks[this.blocks.length - 1]) || (null);
        this.state = Blockchain.verifyBlock(prev, this.state, block);
        this.blocks.push(block);
    }

    mine(miner, transactions = []) {
        const prev = (this.blocks[this.blocks.length - 1]) || (null);
        this.push(new Block({
            parentHash: prev && prev.hash(),
            stateHash: this.state.hash(),
            transactions, miner,
        }).mine());
    }
}

module.exports = Blockchain;