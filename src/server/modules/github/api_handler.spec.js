'use strict';

let assert = require('assert');
let githubHandler = require('./api_handler');
let githubService = require('./github');
let sinon = require('sinon');

describe('githubHandler', () => {
    let req;
    let res;
    let meta;
    beforeEach(() => {
        req = {};
        res = {
            status: () => { return this; },
            send: () => {}
        };
        meta = {};
        sinon.spy(githubHandler, 'respond');
        sinon.stub(githubService, 'callGithub', (args, done) => {
            done(null, {}, meta);
        });
        sinon.stub(githubService, 'getNext', (meta, data, done) => {
            meta.hasNext = false;
            done(null, [{}, {}], meta);
        });
    });
    afterEach(() => {
        githubHandler.respond.restore();
        githubService.callGithub.restore();
        githubService.getNext.restore();
    });

    describe('callGithub', () => {
        it('should add user token and call githubService', () => {
            req.user = {token: 'testToken'};
            req.args = {
                obj: 'obj',
                fun: 'fun',
                data: 'data'
            };

            githubHandler.callGithub(req, res);

            assert(githubHandler.respond.called);
            assert(githubService.callGithub.calledWithMatch({ token: 'testToken' }));
        });

        it('should add no token if token provided', () => {
        });

        it('should load all pages as default', () => {
            meta.hasNext = true;

            req.user = {token: 'testToken'};
            req.args = {
                obj: 'obj',
                fun: 'fun',
                data: 'data'
            };

            githubHandler.callGithub(req, res);

            assert(githubHandler.respond.called);
            assert(githubHandler.respond.calledTwice);
        });
    });
});
