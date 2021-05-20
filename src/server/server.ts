require('dotenv').config()

import { helpers as socket } from './socket';

const compression = require('compression');

const path = require('path');;

const fs = require('fs');

const express = require('express');

import apiRouter from './routes/api';
import formsRouter from './routes/forms';

const app = express();

app.use(express.static('public'));

app.use(compression());

app.use('/api', apiRouter);
app.use('/forms', formsRouter);

app.get('*', function (req: any, res: any) {
    res.sendFile('index.html', { root: path.join(__dirname, process.env.PATH_PUBLIC) });
});


///////////////////////////////////////////////////////////////////////////////
// SOCKET
///////////////////////////////////////////////////////////////////////////////

let server: any;

const http = require('http');
const https = require('https');

if (process.env.NODE_ENV != 'production') {
    const privateKey = fs.readFileSync(
        __dirname + '/certs/dev/key.pem',
        'utf8'
    );
    const certificate = fs.readFileSync(
        __dirname + '/certs/dev/cert.pem',
        'utf8'
    );

    let credentials = {
        key: privateKey,
        cert: certificate
    };

    server = https.createServer(credentials, app);
} else {
    // NO SSL
    server = http.createServer(app);

    // SSL
    // server = https.createServer(credentials, app);
}

// SSL
socket.initialize(server);
//

// NO SSL
// const http = require('http');
// const server = http.createServer(app);
// socket.initialize(server);
//

const port = process.env.PORT || 3000;
const host = process.env.NODE_HOST

server.listen(port, host, (err: any) => {
    const url = `https://${host}:${port}`;

    if (err) console.error(`==> 😭  OMG!!! ${err}`);

    console.info(`==> 🌎  Listening at ${url} ${process.env.NODE_ENV}`);
});

