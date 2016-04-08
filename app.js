'use strict';

let http = require('http');

//////////////////////////////////////////////////////////////////////////////////////////////
// Initialize server
//////////////////////////////////////////////////////////////////////////////////////////////

let app = require('./src/server/app.js');

http.createServer(app).listen(config.server.localport).on('listening', () => {
    console.log(' ___ _     __      __   __   __  _  __  ___  __  _  _ ___');
    console.log('|    |    |__|    |__| [__  [__  | [__   |  |__| |\\ |  |');
    console.log('|___ |___ |  |    |  |  __]  __] |  __]  |  |  | | \\|  |');
    console.log('\n✓ '.bold.green + 'bootstrapped, '.bold + 'app listening on localhost:' + config.server.localport);
});
