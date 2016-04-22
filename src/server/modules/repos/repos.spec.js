'use strict';

let repos = require('./repos');
let assert = require('assert');
let ReposModel = require('./repos.model');
let sinon = require('sinon');
let testData = require('../../testData');

describe('repos:', () => {
    describe('create', () => {
        beforeEach(() => {
            sinon.stub(ReposModel, 'create', (args, cb) => {
                cb(null, testData.repo_from_db);
            });
        });
        afterEach(() => {
            ReposModel.create.restore();
        });
        it('should create DB entry', () => {
            let args = {
                'repoId': testData.repo_from_db.repoId,
                'owner': testData.repo_from_db.owner,
                'ownerId': testData.repo_from_db.ownerId,
                'repo': testData.repo_from_db.repo,
                'gist': testData.repo_from_db.gist,
                'token': testData.repo_from_db.token
            };

            repos.create(args, (err, newRepo) => {
                assert(newRepo);
            });

            assert(ReposModel.create.calledWithMatch(args));
        });
    });
    describe('getMultiple', () => {
        beforeEach(() => {
            sinon.stub(ReposModel, 'find', (args, cb) => {
                assert(args.repoId.$in.length > 0);
                cb([{}, {}]);
            });
        });
        afterEach(() => {
            ReposModel.find.restore();
        });

        it('should return all repos from DB matching repoIds', (it_done) => {
            let args = {repoId: ['repoId_1', 'repoId_2']};

            repos.getMultiple(args, (dbRepos) => {
                assert(dbRepos.length === 2);
                it_done();
            });
        });
    });
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
