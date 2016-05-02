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

    linkRepo(req, res) {
        let args = req.args;
        let token =  req.user.token;
        let repos ;

        try{
          repos = args.map( (repo) => {
             return {
                   owner: repo.owner,
                   ownerId: repo.ownerId,
                   repo: repo.repo,
                   repoId: repo.repoId,
                   gist: repo.gist,
                   token: token
             };
        });

        repoService.create(repos, (err, obj) => {
            this.respond(res, err, obj);
        });

        }
        catch (exception){
            this.respond(res, 'Illegal Arguments', obj);
        }
        
    }
}

module.exports = new RepoHandler();
