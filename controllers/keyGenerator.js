import bcu from "bigint-crypto-utils";
import { PublicKey } from "../models/PublicKey";
import { PrivateKey } from "../models/PrivateKey";
const _ONE = BigInt(1);
const _E = BigInt(65537);
export async function generateRandomKeys(bitLength = 2048) {
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
