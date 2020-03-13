import bcu from "bigint-crypto-utils";
import {PublicKey} from "../models/PublicKey";
import {PrivateKey} from "../models/PrivateKey";

const _ONE: bigint = BigInt(1);
const _E: bigint = BigInt(65537);

export async function generateRandomKeys(bitLength: number = 2048) {
    let p, q, n, phi: bigint;
    do {
        p = await bcu.prime(Math.floor(bitLength / 2) + 1);
        q = await bcu.prime(Math.floor(bitLength / 2));
        n = p.multiply(q);
        phi = p.subtract(1).multiply(q.subtract(1));
    } while (q === p || bcu.bitLength(n) !== bitLength || !(bcu.gcd(_E, phi) === _ONE));

    let d: bigint = await bcu.modInv(_E, phi);

    return [new PublicKey(_E, n), new PrivateKey(d, n)];
}