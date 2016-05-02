'use strict';

let assert = require('assert');
let repoHandler = require('./api_handler');
let repoService = require('./repos');
let sinon = require('sinon');
const testData = require('../../testData');

describe('repoHandler', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: () => { return this; },
            send: () => {}
        };
        sinon.spy(repoHandler, 'respond');

        sinon.stub(repoService, 'getOne', function(args, done) {
            assert(typeof args.repoId === 'string');
            done(null, {});
        });

        sinon.stub(repoService, 'getMultiple', function(args, done) {
            assert(typeof args.repoId === 'object');
            done(null, [ {}, {} ]);
        });

        sinon.stub(repoService, 'create', function(args, done) {
            done(null, {});
        });
    });
    afterEach(() => {
        repoService.create.restore();
        repoService.getMultiple.restore();
        repoService.getOne.restore();
        repoHandler.respond.restore();
    });

    describe('linkRepo', () => {
        it('should create new DB entry if there is none', () => {
            repoService.create.restore();
            sinon.stub(repoService, 'create', (args, done) => {
                assert.equal(args[0].token, 'testToken');
                done(null, {});
            });

            req.user = {token: 'testToken'};
            req.args = testData.reposCreateMultiple;

            repoHandler.linkRepo(req, res);
            assert(repoHandler.respond.called);
            assert(repoService.create.calledOnce);
        });

    });


    describe('getRepos', () => {
        it('should get single repo if only one repoId provided', () => {
            req.args = { repoId: 'testId' };

            repoHandler.getUserRepos(req, res);

            assert(repoHandler.respond.called);
        });

        it('should handle repoId as get parameter too', () => {
            req.args = {};
            req.params = { repoId: 'testId' };

            repoHandler.getUserRepos(req, res);

            assert(repoHandler.respond.called);
        });

        it('should get multiple repos if an array of repoIds provided', () => {
            req.args = { repoId: ['testId_1', 'testId_2'] };

            repoHandler.getUserRepos(req, res);

            assert(repoHandler.respond.called);
        });
    });
});
