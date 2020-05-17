import { resolve } from "path";
import { readFileSync } from "fs";
import { Platform } from '../constants';

export const getPlatformPublicKey = (platform: Platform): string => {

    const publicKeyObj = {
        [Platform.SAMPLE_PLATFORM]: "storage/sample-platform-public.key"
    };

    const publicKeyPath = resolve(publicKeyObj[platform]);
    const publicKey: string = readFileSync(publicKeyPath, "utf-8");
    return publicKey;
}