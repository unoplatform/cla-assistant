'use strict';

let url = require('../helper/url');
// let repoService = require('../services/repo');
// let logger = require('../services/logger');
let passport = require('passport');
let Strategy = require('passport-github2').Strategy;
let merge = require('merge');
let User = require('../user/user.model');

passport.use(new Strategy({
        clientID: config.server.github.client,
        clientSecret: config.server.github.secret,
        callbackURL: url.githubCallback
    },
    function(accessToken, refreshToken, profile, done) {
        let mails = profile.emails.map((obj) => { return obj.value; } ).toString();

        User.update({
            uuid: profile.id
        }, {
            name: profile.username,
            emails: mails,
            token: accessToken
        }, {
            upsert: true
        }, function() {
        });

        // repoService.getUserRepos({token: accessToken}, function(err, res){
        //     if (res && res.length > 0) {
        //         res.forEach(function(repo){
        //             if (repo.token !== accessToken) {
        //                 repo.token = accessToken;
        //                 repo.save();
        //                 logger.debug('Update access token for repo', repo.repo);
        //             }
        //         });
        //     } else if (err) {
        //         logger.warn(err);
        //     }
        // });
        done(null, merge(profile._json, {
            token: accessToken
        }));
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
