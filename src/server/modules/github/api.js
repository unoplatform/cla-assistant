'use strict';
let router = require('express').Router();
// let GithubHandler = require('./api.handler');

router.get('/user', api_handler.github.handleUser);

module.exports = router;
