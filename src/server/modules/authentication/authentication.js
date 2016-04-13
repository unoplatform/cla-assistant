'use strict';

class Authentication {
    constructor() {

    }
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated() || config.server.free_api.indexOf(req.originalUrl) > -1) {
            return next();
        }

        res.status(401).send('Authentication required');
    }
};

module.exports = new Authentication();
