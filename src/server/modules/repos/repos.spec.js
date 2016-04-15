'use strict';

let repos = require('./repos');
let assert = require('assert');
let ReposModel = require('./repos.model');
let sinon = require('sinon');

describe('repos:', () => {
    describe('getOne', () => {
        beforeEach(() => {
            sinon.stub(ReposModel, 'findOne', (args, cb) => {
                assert(args.repoId);
                cb({});
            });
        });
        afterEach(() => {
            ReposModel.findOne.restore();
        });

        it('should return a repo from DB using repoId', (it_done) => {
            let args = {repoId: 'repoId'};

            repos.getOne(args, (dbRepo) => {
                assert(dbRepo);
                it_done();
            });
        });
    });
});
