import * as socketIo from 'socket.io';
import * as redis from "redis";
import { decode } from "jsonwebtoken";
import { resolve } from 'path';
import { readFileSync } from "fs";

import { Server } from 'http';
import { getPublicKey } from '../utils/storage';

import { SocketEvent, VerifyTokenStatus, Platform } from '../constants';
import { verifyTokenSignature, platforms } from "../utils/jsonwebtoken";
import { IDecodedToken } from "../interfaces/jsonwebtoken";

const publicKey: string = getPublicKey(Platform.SAMPLE_PLATFORM);

class SocketServer {

    private _io: SocketIO.Server;
    private _redis: redis.RedisClient;

    constructor(server: Server, redis: redis.RedisClient) {
        this._io = socketIo(server);
        this._redis = redis;
        this.listen();
    }

    private listen(): void {

        this._io
            .origins("*:*")
            .use((socket: any, next) => {

                const socketAccessToken: string = socket.handshake.query.token;
                const verifyOutcome: VerifyTokenStatus = verifyTokenSignature(
                    socketAccessToken, publicKey
                );

                switch (verifyOutcome) {
                    case VerifyTokenStatus.ACCESS_TOKEN_NOTFOUND:
                        socket.disconnect();
                        return;
                    case VerifyTokenStatus.SIGNATURE_VERIFICATION_FAILURE:
                        socket.disconnect();
                        return;
                    case VerifyTokenStatus.TOKEN_EXPIRED:
                        socket.disconnect();
                        return;
                    case VerifyTokenStatus.SUCCESS:
                        break;
                    default:
                        socket.disconnect();
                        return;
                }

                const decodedToken: IDecodedToken = decode(socketAccessToken) as IDecodedToken;
                const { aud: tokenAudience, sub: tokenSubscriber } = decodedToken;
                const assignedPlatform: Platform | undefined = platforms(tokenAudience);

                if (assignedPlatform === undefined) {
                    socket.disconnect();
                    return;
                }

                socket.platform = assignedPlatform;
                socket.subscriber = tokenSubscriber;

                next();

            })
            .on(SocketEvent.CONNECT, (socket: any) => {

                // Get socket id and sub from client, then store to redis
                const socketId: string = socket.id;
                const sub: string = socket.subscriber;
                const platform: string = socket.platform;
                const platformSubscriber = `${ platform.toUpperCase() }@${ sub }`;
                this._redis.set(platformSubscriber, socketId);

                // remove sub from redis once disconnect
                socket.on(SocketEvent.DISCONNECT, () => {
                    this._redis.del(platformSubscriber);
                });

            });


        if (this._io) {
            console.log('Running Socket Server is listening.');
        }

    }

    public close(): void {
        this._io.on('end', (socket: any) => {
            socket.disconnect(0);
            console.info(new Date(), "[SocketServer]: Disconnect");
        })
    }

    get(): SocketIO.Server {
        return this._io;
    }
}

export default SocketServer;