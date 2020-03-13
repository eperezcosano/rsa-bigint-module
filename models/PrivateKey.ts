import { modPow } from "bigint-crypto-utils";
import { textToBigint, bigintToText } from "bigint-conversion";

export class PrivateKey {

    d: bigint;
    n: bigint;

    constructor(d: bigint, n: bigint) {
        this.d = d;
        this.n = n;
    }

    decrypt(c: bigint): string {
        return bigintToText(modPow(c, this.d, this.n));
    }

    sign(m: string): bigint {
        return modPow(textToBigint(m), this.d, this.n);
    }

}