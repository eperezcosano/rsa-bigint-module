'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var bcu = require('bigint-crypto-utils');
var bcu__default = _interopDefault(bcu);
var bigintConversion = require('bigint-conversion');

class PublicKey {
    constructor(e, n) {
        this.e = e;
        this.n = n;
    }
    encrypt(m) {
        return bcu.modPow(bigintConversion.textToBigint(m), this.e, this.n);
    }
    verify(s) {
        return bigintConversion.bigintToText(bcu.modPow(s, this.e, this.n));
    }
}

class PrivateKey {
    constructor(d, n) {
        this.d = d;
        this.n = n;
    }
    decrypt(c) {
        return bigintConversion.bigintToText(bcu.modPow(c, this.d, this.n));
    }
    sign(m) {
        return bcu.modPow(bigintConversion.textToBigint(m), this.d, this.n);
    }
}

const _ONE = BigInt(1);
const _E = BigInt(65537);
async function generateRandomKeys(bitLength = 2048) {
    let p, q, n, phi;
    do {
        p = await bcu__default.prime(Math.floor(bitLength / 2) + 1);
        q = await bcu__default.prime(Math.floor(bitLength / 2));
        n = p.multiply(q);
        phi = p.subtract(1).multiply(q.subtract(1));
    } while (q === p || bcu__default.bitLength(n) !== bitLength || !(bcu__default.gcd(_E, phi) === _ONE));
    let d = await bcu__default.modInv(_E, phi);
    return [new PublicKey(_E, n), new PrivateKey(d, n)];
}

exports.PrivateKey = PrivateKey;
exports.PublicKey = PublicKey;
exports.generateRandomKeys = generateRandomKeys;
