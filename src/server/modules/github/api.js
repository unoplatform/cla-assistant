'use strict';

let githubService = require('./github');
let router = require('express').Router();

router.get('/user', (req, res) => {
    let args = {
        obj: 'user',
        fun: 'get',
        token: req.user.token
    };
    githubService.callGithub(args, (err, data, meta) => {
        if (err) {
            return res.status(err.code > 0 ? err.code : 500).send(JSON.stringify(err.text || err));
        }
        if (data) {
            res.send(JSON.stringify({data: data, meta: meta}));
        } else {
            res.send();
        }
    });
});

module.exports = router;
