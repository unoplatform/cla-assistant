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
    getMultiple(args, done) {
        ReposModel.find({
            repoId: { $in: args.repoId }
        }, done);
    }
    create(repos, done) {
        ReposModel.create(repos, done);
    }
}

module.exports = new Repos();
