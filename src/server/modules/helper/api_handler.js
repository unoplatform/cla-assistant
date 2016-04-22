'use strict';

class ApiHandler {
    constructor(){
    }
    respond(res, err, data) {
        if (err) {
            return res.status(err.code > 0 ? err.code : 500).send(JSON.stringify(err.text || err));
        }
        if (data) {
            try {
                res.send(JSON.stringify(data));
            } catch (e) {
                res.send(data);
            }
        } else {
            res.send();
        }
    }
}

module.exports = ApiHandler;
