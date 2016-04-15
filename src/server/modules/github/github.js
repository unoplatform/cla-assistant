'use strict';

let GitHubApi = require('github');

class GithubService {
    constructor() {
        this.github = new GitHubApi({
            protocol: config.server.github.protocol,
            version: config.server.github.version,
            host: config.server.github.api,
            pathPrefix: config.server.github.enterprise ? '/api/v3' : null
        });
    }

    callGithub(args, cb) {
        let obj = args.obj;
        let fun = args.fun;
        let arg = args.arg || {};
        let token = args.token;
        let basicAuth = args.basicAuth;

        if(!obj || !this.github[obj]) {
            return cb('obj required/obj not found');
        }

        if(!fun || !this.github[obj][fun]) {
            return cb('fun required/fun not found');
        }

        if(token) {
            this.github.authenticate({
                type: 'oauth',
                token: token
            });
        }

        if(basicAuth) {
            this.github.authenticate({
                type: 'basic',
                username: basicAuth.user,
                password: basicAuth.pass
            });
        }

        this.github[obj][fun](arg, function(err, res) {

            let meta = {};

            try {
                meta.link = res.meta.link;
                meta.hasMore = !!this.github.hasNextPage(res.meta.link);
                meta.scopes = res.meta['x-oauth-scopes'];
                delete res.meta;
            } catch (ex) {
                meta = null;
            }

            if(typeof cb === 'function') {
                cb(err, res, meta);
            }

        });
    }
}

module.exports = new GithubService();
