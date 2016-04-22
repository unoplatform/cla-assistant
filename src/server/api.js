'use strict';

let router = require('express').Router();

router.get('/github/user', (req, res, next) => { api_handler.github.handleUser(req, res, next ); });

router.get('/repos', (req, res, next) => { api_handler.repos.getUserRepos(req, res, next); });
router.get('/repos/:repoId', (req, res, next) => { api_handler.repos.getUserRepos(req, res, next); });


router.post('repos', (req, res, next) => { api_handler.repos.createRepo(req, res, next); });

module.exports = router;
