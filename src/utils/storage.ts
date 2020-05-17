import { resolve } from "path";
import { readFileSync } from "fs";
import { Platform } from '../constants';

export const getPublicKey = (platform: Platform): string => {

    const publicKeyObj = {
        [Platform.SAMPLE_PLATFORM]: "storage/sample-platform-public.key"
    };

    try {
        const publicKeyPath = resolve(publicKeyObj[platform]);
        const publicKey: string = readFileSync(publicKeyPath, "utf-8");
        return publicKey;
    } catch (err) {
        throw new Error("Public Key not found to start Socket Server");
    }
}