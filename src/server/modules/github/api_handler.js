'use strict';

let githubService = require('./github');
let ApiHandler = require('../helper/api_handler');

class GithubHandler extends ApiHandler{
    constructor() {
        super();
        this.req = '';
    }
    respond(err, data, meta) {
        let obj = {
            data: data,
            meta: meta
        };
        super.respond(this.res, err, obj);
    }
    handleUser(req, res) {
        let args = {
            obj: 'user',
            fun: 'get',
            token: req.user.token
        };

        this.req = req;
        this.res = res;

        githubService.callGithub(args, (err, res, meta) => {
            this.respond(err, res, meta);
        });
    }
}

module.exports = new GithubHandler();
