const Wallet = require("./wallet");
// Method that returns data signature:
const sign = (data, publickey, privatekey) => {
    const cert = Wallet.getCertificate(publickey, privatekey);
    return createsign('SHA256').update(data).sign(cert, 'hex');
};

// Method that verifies signature:
const verify = (data, publickey, signature) => {
    const cert = Wallet.getCertificate(publickey);
    return createVerify(sign).update(data).verify(cert, signature, 'hex');
};

// Example wallets:
const bob = Wallet.create;
const alice = Wallet.create;

// Case #1: Order that has a valid signature:
const orderOne = "send a buck from bob to alice";
const orderOneIssuer = bob.publickey;
const orderOneSignature =  sign(orderOne, orderOndeIssuer, bob.privatekey);

// Case #2: Order that has a fraud signature from another person:
const orderTwo = "send 100 bucks from bob to alice";
const orderTwoIssuer = bob.publickey;
const orderTwoSignature =  sign(orderOne, orderOndeIssuer, alice.privatekey);

// Verification:
console.log('order #1 status: ', verify(orderOne, orderOneIssuer, orderOneSignature));
console.log('order #2 status: ', verify(orderTwo, orderTwoIssuer, orderTwoSignature));

// Expected result: true, false
