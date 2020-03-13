import bcu, { modPow } from 'bigint-crypto-utils';
import { textToBigint, bigintToText } from 'bigint-conversion';

class PublicKey {
    constructor(e, n) {
        this.e = e;
        this.n = n;
    }
    encrypt(m) {
        return modPow(textToBigint(m), this.e, this.n);
    }
    verify(s) {
        return bigintToText(modPow(s, this.e, this.n));
    }
}

class PrivateKey {
    constructor(d, n) {
        this.d = d;
        this.n = n;
    }
    decrypt(c) {
        return bigintToText(modPow(c, this.d, this.n));
    }
    sign(m) {
        return modPow(textToBigint(m), this.d, this.n);
    }
}

const _ONE = BigInt(1);
const _E = BigInt(65537);
async function generateRandomKeys(bitLength = 2048) {
    let p, q, n, phi;
    do {
        p = await bcu.prime(Math.floor(bitLength / 2) + 1);
        q = await bcu.prime(Math.floor(bitLength / 2));
        n = p.multiply(q);
        phi = p.subtract(1).multiply(q.subtract(1));
    } while (q === p || bcu.bitLength(n) !== bitLength || !(bcu.gcd(_E, phi) === _ONE));
    let d = await bcu.modInv(_E, phi);
    return [new PublicKey(_E, n), new PrivateKey(d, n)];
}

export { PrivateKey, PublicKey, generateRandomKeys };
