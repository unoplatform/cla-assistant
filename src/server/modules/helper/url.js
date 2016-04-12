'use strict';

var url = require('url');

class Url {
    constructor()  {
        this.baseUrl = url.format({
            protocol: config.server.http.protocol,
            hostname: config.server.http.host,
            port: config.server.http.port
        });
    }

    get githubCallback() {
        return url.resolve(this.baseUrl, '/auth/github/callback');
    }
};

module.exports = new Url();
