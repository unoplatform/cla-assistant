'use strict';

global.config = require('./../../../config');

let assert = require('assert');
let url = require('./url');

describe('url helper', () => {
    it('should return github callback url', () => {
        assert.equal(url.githubCallback, 'https://cla-assistant.io/auth/github/callback');
    });
});
