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

const SRC = path.join(__dirname, '..', '..', 'src', 'client', 'assets');
const DIST = path.join(__dirname, '..', '..', 'dist', 'client');
const NPM = path.join(__dirname, '..', '..', 'node_modules');

app.use('/client', express.static( DIST ));
app.use('/assets', express.static( SRC ));
app.use('/node_modules', express.static( NPM ));


global.api_handler = {};

let glob = require('glob');

let bootstrap = function(moduleName, object) {
    let file = path.join(__dirname, 'modules', moduleName, object);
    if (glob.sync(file + '.js').length <= 0) {
        return;
    }
    try {
        if (object === 'api_handler') {
            api_handler[moduleName] = require(file);
        }
    } catch (ex) {
        console.log('  ✖ '.bold.red + file);
        console.log(ex.stack);
        return;
    }
    console.log('  ✓ '.bold.green + object);
};


console.log('Bootstrap modules .....'.bold);
glob.sync(path.join(__dirname, 'modules', '*')).forEach(function(dir) {
    let moduleName = path.basename(dir);

    console.log(moduleName.bold);
    bootstrap(moduleName, 'api_handler');
});

app.use('/', require('./modules/authentication/api'));
app.use('/api', require('./modules/authentication/authentication').isAuthenticated);
app.use('/api/v1/', require('./api'));

app.get('/', (req, res) => {
	res.setHeader('Last-Modified', (new Date()).toUTCString());
	res.status(200).sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

module.exports = app;
