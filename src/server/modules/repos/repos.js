'use strict';

let ReposModel = require('./repos.model');

class Repos {
    constructor() {

    }

    getOne(args, done) {
        ReposModel.findOne({repoId: args.repoId}, function (err, repo) {
            done(err, !!repo);
        });
    }
}

module.exports = new Repos();
