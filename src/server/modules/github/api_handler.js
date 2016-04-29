'use strict';

let githubService = require('./github');
let ApiHandler = require('../helper/api_handler');

class GithubHandler extends ApiHandler{
    constructor() {
        super();
    }
    respond(err, data, meta, res) {
        let obj = {
            data: data,
            meta: meta
        };
        if (meta && meta.hasNext) {
            githubService.getNext(meta, data, (e, d, m) => {
                this.respond(e, d, m, res);
            });
        } else {
            super.respond(res, err, obj);
        }
    }
    callGithub(req, res) {
        req.args.token = req.user.token;

        // this.req = req;
        // this.res = res;

        githubService.callGithub(req.args, (err, data, meta) => {
            this.respond(err, data, meta, res);
        });
    }
}

module.exports = new GithubHandler();
