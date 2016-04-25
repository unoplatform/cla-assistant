'use strict';

let router = require('express').Router();

router.post('/github', (req, res, next) => { api_handler.github.callGithub(req, res, next ); });

/**
 * @api {get} /user/repos Request all (linked) repositories of the logged user
 * @apiName User Repos
 * @apiGroup Repos
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/user/repos', (req, res, next) => { api_handler.repos.getUserRepos(req, res, next); });

/**
 * @api {get} /repos/:repoId Request repository of the logged user
 * @apiName Repo
 * @apiGroup Repos
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/repos/:repoId', (req, res, next) => { api_handler.repos.getUserRepos(req, res, next); });

/**
 * @api {post} /repos Create/Update a link for repository
 * @apiName Create/Update
 * @apiGroup Repos
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('repos', (req, res, next) => { api_handler.repos.createRepo(req, res, next); });

module.exports = router;
