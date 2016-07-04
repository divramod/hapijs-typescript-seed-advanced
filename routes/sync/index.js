'use strict';
var co = require('co');

exports.register = function(server, options, next) {

  const db = server.app.mongodb;
  const playerCol = db.collection('player');
  const clubCol = db.collection('club');
  const gameCol = db.collection('game');

  // =========== [ /sync/app/anon ] ===========
  server.route({
    method: 'POST',
    path: '/sync/app/anon',
    config: { auth: false },
    handler: function(request, reply) {
      co(function *(){
        console.log("/sync/app/anon");
        let state = {};
        state.player = yield playerCol.find({}).toArray();
        state.club = yield clubCol.find({}).toArray();
        state.game = yield gameCol.find({ 'public': true }).toArray();
        reply(state);
      });
    }
  });

  // =========== [ /sync/app/user ] ===========
  server.route({
    method: 'POST',
    path: '/sync/app/user',
    config: { auth: 'jwt' },
    handler: function(request, reply) {
      co(function *(){
        let token = request.headers.authorization;
        let user = yield db.collection('user').find({ token: token }).toArray();
        let state = {
          game: [],
          player: []
        };
        if (user.length > 0) {
          let user_id = user[0]._id;
          state.player = yield playerCol.find({
            _id: { $in: user[0].ids_player }
          }).toArray();
          state.game = yield gameCol.find({ 
            id_player: { $in: user[0].ids_player }
          }).toArray();
        }

        reply(state);
      });
    }
  });

  // =========== [ NEXT ] ===========
  return next();
};

exports.register.attributes = {
  name: 'routes-sync'
};
