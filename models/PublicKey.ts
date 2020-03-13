import { modPow } from "bigint-crypto-utils";
import { textToBigint, bigintToText } from "bigint-conversion";

export class PublicKey {

    e: bigint;
    n: bigint;

    constructor(e: bigint, n: bigint) {
        this.e = e;
        this.n = n;
    }

    encrypt(m: string): bigint {
        return modPow(textToBigint(m), this.e, this.n);
    }

    verify(s: bigint): string {
        return bigintToText(modPow(s, this.e, this.n));
    }

}