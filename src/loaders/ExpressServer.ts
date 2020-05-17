import * as express from 'express';
import * as bodyParser from "body-parser";
import config from "../config";
import cors = require('cors');

// import Router from "../apis/routes";

import { Server, createServer } from 'http';
import { resolve } from "path";


class ExpressServer {
    public static readonly PORT: number = 8080;

    private _app: express.Application;
    private _server: Server;
    private _port: number;

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

        // start nodejs server
        this._port = config.serverPort || ExpressServer.PORT;
        this._server = createServer(this._app);
        this._server.listen(this._port, () => {
            console.log('Running Express Server on port %s', this._port);
        })

    }

    public close(): void {

        // close express server
        this._server.close((err) => {
            if (err) throw Error();

            // close redis server. 
            // closeServer();

            console.info(new Date(), '[ExpressServer]: Stopped');
        });
    }

    get server(): Server { return this._server; }
}

export default ExpressServer; 
