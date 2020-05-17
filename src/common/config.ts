import * as dotenv from "dotenv";
import { resolve } from "path";

// environment file error should crash whole process
const ENV_FILE_PATH = resolve(".env");
const isEnvFound = dotenv.config({ path: ENV_FILE_PATH });
if (isEnvFound.error) {
    throw new Error("Cannot find .env file.");
}

// Assign default value for each environments
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.SERVER_PORT = process.env.SERVER_PORT || "8080";
process.env.REDIS_PORT = process.env.REDIS_PORT || "6379";
process.env.SAMPLE_PLATFORM_PUBLIC_KEY = process.env.SAMPLE_PLATFORM_PUBLIC_KEY || "123123";

export default {
    // express server port
    serverPort: parseInt(process.env.SERVER_PORT, 10),

    // redis port
    redisPort: parseInt(process.env.REDIS_PORT, 10),

    // json web token audiences
    samplePlatformAudience: process.env.SAMPLE_PLATFORM_AUDIENCE,
    samplePlatformPublicKey: process.env.SAMPLE_PLATFORM_PUBLIC_KEY
}