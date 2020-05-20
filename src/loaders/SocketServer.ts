import * as socketIo from 'socket.io';

import { RedisClient } from "redis";
import { decode } from "jsonwebtoken";
import { Server } from 'http';
import { getPlatformPublicKey } from '../utils/storage';

import { SocketEvent, VerifyTokenStatus, Platform } from '../common/constants';
import { verifyTokenSignature, platforms } from "../utils/jsonwebtoken";
import { IDecodedToken } from "../common/interfaces/jsonwebtoken";

class SocketServer {

    private _io: SocketIO.Server;
    private _redis: RedisClient;

    constructor(server: Server, redis: RedisClient) {
        this._io = socketIo(server);
        this._redis = redis;
        this.listen();
    }

    private listen(): void {

        this._io
            .origins("*:*")
            .use((socket: any, next) => {

                // token format verification
                const socketAccessToken: string = socket.handshake.query.token;
                const decodedToken: IDecodedToken = decode(socketAccessToken) as IDecodedToken;
                if (decodedToken === null) {
                    socket.disconnect();
                    return;
                }

                // identify whether the token is from our platform
                const { aud: tokenAudience, sub: tokenSubscriber } = decodedToken;
                const assignedPlatform: Platform | undefined = platforms(tokenAudience);
                if (assignedPlatform === undefined) {
                    socket.disconnect();
                    return;
                }

                // verify the signature of token with public key assigned to specific platform
                const publicKey: string = getPlatformPublicKey(assignedPlatform);
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

    get instance(): SocketIO.Server {
        return this._io;
    }
}

export default SocketServer;