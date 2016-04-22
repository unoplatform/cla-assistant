'use strict';

let assert = require('assert');
let githubHandler = require('./api_handler');
let githubService = require('./github');
let sinon = require('sinon');

describe('githubHandler', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: () => { return this; },
            send: () => {}
        };
        sinon.spy(githubHandler, 'respond');
        sinon.stub(githubService, 'callGithub', (args, done) => {
            done(null, {});
        });
    });
    afterEach(() => {
        githubHandler.respond.restore();
        githubService.callGithub.restore();
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
    });
});
