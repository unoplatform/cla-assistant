'use strict';

let GitHubApi = require('github');
let github = new GitHubApi({
            protocol: config.server.github.protocol,
            version: config.server.github.version,
            host: config.server.github.api,
            pathPrefix: config.server.github.enterprise ? '/api/v3' : null
        });

function extractMeta(res) {
    let meta = {};

    try {
        meta.link = res.meta.link;
        meta.hasNext = !!github.hasNextPage(res.meta.link);
        meta.scopes = res.meta['x-oauth-scopes'];
        delete res.meta;
    } catch (ex) {
        meta = null;
    }
    return meta;
}

class GithubService {
    constructor() {
        this.github = github;
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

            let meta = extractMeta(res);

            if(typeof cb === 'function') {
                cb(err, res, meta);
            }

        });
    }
    getNext(meta, data, cb) {
        this.github.getNextPage(meta, (err, res) => {
            let newData = data.concat(res);
            meta = extractMeta(res);

            if(typeof cb === 'function') {
                cb(err, newData, meta);
            }
        });
    }
}

module.exports = new GithubService();
