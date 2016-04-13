'use strict';

require('./passport');
let passport = require('passport');
let express = require('express');

let router = express.Router();
let authScope;

router.get('/auth/github', checkReturnTo);

router.get('/auth/github/callback', passport.authenticate('github', { successReturnToOrRedirect: '/' }));

router.get('/logout', (req, res, next) => {
    req.logout();
    return req.query.noredirect ? next() : res.redirect('/');
 });

function checkReturnTo(req, res, next) {
    authScope = req.query.admin === 'true' ? config.server.github.admin_scope : config.server.github.public_scope;
    let returnTo = req.query.admin === 'true' ? '/' : req.session.next;
    if (returnTo) {
        if (!req.session) {
            req.session = {};
        }
        req.session.returnTo = returnTo;
    }
    passport.authenticate('github', {scope: authScope})(req, res, next);
}

module.exports = router;
