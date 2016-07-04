'use strict'

/**
 * Dependencies.
 */
const Hapi = require('hapi');
const mongojs = require('mongojs');
const MongoClient = require('mongodb').MongoClient;
const co = require('co');

co(function *(){
  // Create a new server
  const server = new Hapi.Server();

  // Setup the server with a host and port
  server.connection({
    port: parseInt(process.env.PORT, 10) || 8101,
    router: {
      stripTrailingSlash: true
    },
    routes: {
      cors: true
    }
  });

  //Connect to db
  server.app.db = mongojs('kegelapp');
  server.app.mongodb = yield MongoClient.connect('mongodb://localhost:27017/kegelapp');

  // Export the server to be required elsewhere.
  module.exports = server;

  /**
   * Load all plugins and then start the server.
   * First: community/npm plugins are loaded
   * Second: project specific plugins are loaded
   */
  server.register([
    {
      register: require("good"),
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: { ops: '*', request: '*', log: '*', response: '*', 'error': '*' }
        }]
      }
    },
    // APP
    { register: require('./routes/auth/index.js') },
    { register: require('./routes/user/index.js') },
    // UTILS
    { register: require('./routes/sync/index.js') },
    // TEST
    //{ register: require('./test/base/index.js') }
  ], function () {
    //Start the server
    server.start(function() {
      //Log to the console the host and port info
      console.log('Server started at: ' + server.info.uri);
    });
  });
}).catch(function(err){
  console.log(err);
});
