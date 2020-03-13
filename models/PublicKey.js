import { modPow } from "bigint-crypto-utils";
import { textToBigint, bigintToText } from "bigint-conversion";
export class PublicKey {
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
