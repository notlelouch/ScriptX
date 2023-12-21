Scriptx
==========


Introduction
============
ScriptX is a small fully functional cryptocurrency.
ScriptX contains utilities for generating wallets.
ScriptX can create, sign and verify transactions.
ScriptX is able to pack transactions into blocks and mine them.
ScriptX can track state changes and present them in a handy way.

Installation & Usage
====================
Fork the repository and clone it in your local machine

```
    git clone https://github.com/<username>/ScriptX.git
```

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

ScriptX is based on basic blockchain principles but is not a production-ready product
