'use strict';

let repoService = require('./repos');
let ApiHandler = require('../helper/api_handler');

class RepoHandler extends ApiHandler{
    constructor() {
        super();
    }
    getUserRepos(req, res) {
        req.args.repoId = req.args.repoId || req.params.repoId;
        let getFn = typeof req.args.repoId === 'string' ? repoService.getOne : repoService.getMultiple;

        getFn(req.args, (err, obj) => {
            this.respond(res, err, obj);
        });
    }
    createRepo(req, res) {
        let args = req.args;
        args.token = req.user.token;

        repoService.create(args, (err, newRepo) => {
            this.respond(res, err, newRepo);
        });
    }
}

module.exports = new RepoHandler();
