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
    create(args, done) {
        ReposModel.create({
            owner: args.owner,
            ownerId: args.ownerId,
            repo: args.repo,
            repoId: args.repoId,
            gist: args.gist,
            token: args.token
        }, done);
    }
}

module.exports = new Repos();
