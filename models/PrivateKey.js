import { modPow } from "bigint-crypto-utils";
import { textToBigint, bigintToText } from "bigint-conversion";
export class PrivateKey {
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
