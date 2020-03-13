import { modPow } from 'bigint-crypto-utils';
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

export { PrivateKey, PublicKey };
