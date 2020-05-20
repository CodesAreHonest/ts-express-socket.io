import ExpressServer from "./loaders/ExpressServer";
import RedisServer from './loaders/RedisServer';
import SocketServer from './loaders/SocketServer';

// start express
const expressServer = new ExpressServer();
const expressInstance = expressServer.server;

// start redis
const redisServer = new RedisServer();
const redisInstance = redisServer.initialize();
expressServer.initRedis(redisServer);

// start socket 
const socketServer = new SocketServer(expressInstance, redisInstance);
const socketInstance = socketServer.instance;
expressServer.initSocket(socketInstance);

process.on('exit', () => {

    expressServer.close();
    redisServer.close();
    socketServer.close();

}).on('SIGINT', () => {

    expressServer.close();
    redisServer.close();
    socketServer.close();

})

export { expressServer, redisServer, socketServer };