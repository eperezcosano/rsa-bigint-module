export class PrivateKey {
    constructor(d: any, n: any);
    d: any;
    n: any;
    decrypt(c: any): string;
    sign(m: any): bigint;
}
export class PublicKey {
    constructor(e: any, n: any);
    e: any;
    n: any;
    encrypt(m: any): bigint;
    verify(s: any): string;
}
export function generateRandomKeys(bitLength?: number): Promise<(PublicKey | PrivateKey)[]>;
