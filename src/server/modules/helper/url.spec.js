'use strict';

process.env.HOST = 'host';
process.env.PROTOCOL = 'http';

global.config = require('./../../../config');
let assert = require('assert');
let url = require('./url');

describe('url helper', () => {
    it('should return github callback url', () => {
        assert.equal(url.githubCallback, 'http://host/auth/github/callback');
    });
});
