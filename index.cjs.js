'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bigintCryptoUtils = require('bigint-crypto-utils');
var bigintConversion = require('bigint-conversion');

class PublicKey {
    constructor(e, n) {
        this.e = e;
        this.n = n;
    }
    encrypt(m) {
        return bigintCryptoUtils.modPow(bigintConversion.textToBigint(m), this.e, this.n);
    }
    verify(s) {
        return bigintConversion.bigintToText(bigintCryptoUtils.modPow(s, this.e, this.n));
    }
}

class PrivateKey {
    constructor(d, n) {
        this.d = d;
        this.n = n;
    }
    decrypt(c) {
        return bigintConversion.bigintToText(bigintCryptoUtils.modPow(c, this.d, this.n));
    }
    sign(m) {
        return bigintCryptoUtils.modPow(bigintConversion.textToBigint(m), this.d, this.n);
    }
}

exports.PrivateKey = PrivateKey;
exports.PublicKey = PublicKey;
