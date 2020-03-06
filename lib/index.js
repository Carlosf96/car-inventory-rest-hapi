"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const init = async () => {
    const server = new hapi_1.Server({
        port: 8000,
        host: 'localhost'
    });
    server.route({
        path: '/',
        method: 'GET',
        handler: (req, res) => {
            return 'Hello world!';
        }
    });
    await server.start();
    console.log('Server running on ' + server.info.uri);
};
