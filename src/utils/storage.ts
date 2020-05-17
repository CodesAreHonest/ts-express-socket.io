import config from "../common/config";

import { resolve } from "path";
import { readFileSync } from "fs";
import { Platform } from '../common/constants';

export const getPlatformPublicKey = (platform: Platform): string => {

    const publicKeyObj = {
        [Platform.SAMPLE_PLATFORM]: config.samplePlatformPublicKey
    };

    const publicKeyPath = resolve(publicKeyObj[platform]);
    const publicKey: string = readFileSync(publicKeyPath, "utf-8");
    return publicKey;
}