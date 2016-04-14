'use strict';

require('colors');
let path = require('path');
let express = require('express');
let passport = require('passport');

// ////////////////////////////////////////////////////////////////////////////////////////////////
// Load configuration
// ////////////////////////////////////////////////////////////////////////////////////////////////

global.config = require('./../config');

// ////////////////////////////////////////////////////////////////////////////////////////////////
// Bootstrap services
// ////////////////////////////////////////////////////////////////////////////////////////////////

let mongoose = require('mongoose');
mongoose.connect(config.server.mongodb.uri, {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
});

// ////////////////////////////////////////////////////////////////////////////////////////////////
// Express application
// ////////////////////////////////////////////////////////////////////////////////////////////////

let app = express();


// redirect from http to https
app.use(function(req, res, next) {
    if (!req.headers['x-forwarded-proto'] || req.headers['x-forwarded-proto'] === 'https') {
        next();
        return;
    }
    let host = req.headers['x-forwarded-host'] || req.headers.host;

    res.setHeader('location', 'https://' + host + req.url);
    res.statusCode = 301;
    res.end();
});

app.use(require('x-frame-options')());
app.use(require('body-parser').json());
app.use(require('cookie-parser')());
app.use(require('cookie-session')({
    secret: config.server.security.sessionSecret,
    cookie: {
        maxAge: config.server.security.cookieMaxAge
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./modules/authentication/api'));
app.use('/api', require('./modules/authentication/authentication').isAuthenticated);

const SRC = '../../src/client';
const DIST = '../../dist/client';
const NPM = '../../node_modules/**/*';

console.log(__dirname);
app.use('/client', express.static(path.join(__dirname, DIST)));
app.use('/client', express.static(path.join(__dirname, SRC)));
app.use('/node_modules', express.static(path.join(__dirname, '..', '..', 'node_modules')));
app.use('/', express.static(path.join(__dirname, SRC)));


app.get('/', (req, res) => {
    let filePath;
    if (req.user) {
      filePath = path.join(__dirname, '..', 'client', 'home', 'home.html');
    }
    else {
      filePath = path.join(__dirname, '..', 'client', 'index.html');
    }

	res.setHeader('Last-Modified', (new Date()).toUTCString());
	res.status(200).sendFile(filePath);
});
// custom mrepodleware
// app.use('/api', require('./middleware/param'));
// app.use('/github', require('./middleware/param'));
// app.use('/accept', require('./middleware/param'));
// app.use('/count', require('./middleware/param'));

module.exports = app;
