'use strict';

global.config = require('./../../../config');

let assert = require('assert');
let auth = require('./authentication');

let req_exp;
let res_exp;
describe('authentiacation:isAuthanticated', () => {
    beforeEach( () => {
        req_exp = { isAuthenticated: () => { return true; } };
        res_exp = {
            status: () => { return res_exp; },
            send: () => { }
        };
    });

    it('should call next if YES', () => {
        auth.isAuthenticated(req_exp, res_exp, () => {
            assert.ifError();
        });
    });

    it('should call next if NO but the api is free', () => {
        req_exp = {
            isAuthenticated: () => { return false; },
            originalUrl: '/api/cla/get'
        };
        auth.isAuthenticated(req_exp, res_exp, () => {
            assert.ifError();
        });
    });

    it('should set status 401 if NO', () => {
        req_exp.isAuthenticated = () => { return false; };
        res_exp.send = (msg) => {
            assert.equal(msg, 'Authentication required');
        };
        res_exp.status = (status) => {
            assert.equal(status, 401);
            return res_exp;
        };

        auth.isAuthenticated(req_exp, res_exp, () => {
            assert();
        });
    });
});