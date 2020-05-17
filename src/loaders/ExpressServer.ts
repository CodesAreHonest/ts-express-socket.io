import * as express from 'express';
import * as bodyParser from "body-parser";
import cors = require('cors');

// import Router from "../apis/routes";

import { Server, createServer } from 'http';
import { resolve } from "path";


class ExpressServer {
    public static readonly PORT: number = 8080;

    private _app: express.Application;
    private _server: Server;
    private _port: string | number = ExpressServer.PORT;

    public constructor() {
        this.listen();
    }

    private listen(): void {
        // initialize express instances 
        this._app = express();
        this._app.use(cors());

        // only accept content type application/json
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(bodyParser.json({ type: "*/*" }));

        // close connections on exit.
        process.on('exit', () => { this.closeConnections(); });
        process.on('SIGINT', () => { this.closeConnections(); });

        // start nodejs server
        this._server = createServer(this._app);
        this._server.listen(this._port, () => {
            console.log('Running express server on port %s', this._port);
        })

    }

    private closeConnections(): void {

        // close express server
        this._server.close((err) => {
            if (err) throw Error();

            // close redis server. 
            // closeServer();

            console.info(new Date(), '[Express]: Stopped');
            process.exit(0);
        });
    }

    get app(): express.Application { return this._app; }
}

export default ExpressServer; 
