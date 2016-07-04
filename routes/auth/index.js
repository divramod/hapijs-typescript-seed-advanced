'use strict';

// VENDORS
var Joi = require('joi');
var Boom = require('boom');
var Promise = require('bluebird');
var JWT = require('jsonwebtoken');
var co = require('co');
const uuid = require('node-uuid');

exports.register = function(server, options, next){

  // CONST
  const db = server.app.mongodb;
  const users = db.collection('user');
  const secret = "test";

  // =========== [ jwtValidateToken() ] ===========
  var jwtValidateToken = function (decoded, request, callback) {
    users.find({
      token: request.headers.authorization,
    }, (err, docs) => {
      if (err) {
        console.log(err);
        return callback(null, false);
      }
      if (docs.length === 0) {
        return callback(null, false);
      }
      else {
        return callback(null, true);
      }
    });
  };

  // =========== [ jwtCreateToke() ] ===========
  var jwtGenerateAndSaveToken = function(user) {

    let token = JWT.sign(
      { foo: 'bar' },
      secret,
      {
        exp:  3600,
        algorithms: [ 'HS256' ]
      }
    );

    users.update(
      { _id: user._id },
      { $set:{token:token} },
      function(err, user){
        if (err) {
          console.log(err);
        }
      });
      return token;
  };

  // =========== [ register hapi-auth-jwt2 ] ===========
  server.register([{register: require('hapi-auth-jwt2')}], function(err) {
    if (err) {
      throw err;
    }
    server.auth.strategy( 'jwt', 'jwt',
                         { key: secret,
                           validateFunc: jwtValidateToken,
                           verifyOptions: { algorithms: [ 'HS256' ] }
                         }
                        );

                        server.auth.default('jwt');
  });

  // =========== [ LOGIN ] ===========
  // TODO
  server.route({
    method: 'POST',
    path: '/register',
    config: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().min(2).max(200).required(),
          email: Joi.string().email().required(),
          forename: Joi.string().required(),
          lastname: Joi.string().required()
        }
      },
      handler: function(request, reply) {
        co(function *(){
          const p = request.payload;
          console.log("username: ", p.username);

          // LOOKUP username
          let userNames = yield db.collection('user').find({
            username: p.username
          }).toArray();

          if (userNames.length > 0) {
            console.log("userName existent");
            return reply(Boom.unauthorized('Username existent')).code(400);
          }

          // LOOKUP email
          let userEmails = yield db.collection('user').find({
            email: p.email
          }).toArray();

          if (userEmails.length > 0) {
            console.log("email existent");
            return reply(Boom.unauthorized('email existent')).code(400);
          }

          // CREATE player
          let playerI = yield db.collection('player').insert({
            forename: p.forename,
            lastname: p.lastname
          });
          let player = playerI.ops[0];

          // CREATE user
          let userI = yield db.collection('user').insert({
            username: p.username,
            email: p.email,
            password: p.password,
            ids_player: [player._id]
          });
          let user = userI.ops[0];
          user.token = jwtGenerateAndSaveToken(user);

          let result = {user: user, player: player};
          console.log("result", JSON.stringify(result));

          return reply(user).code(200);
        });
      }
    }
  });















  // =========== [ ISLOGGEDIN ] ===========
  server.route({
    method: 'POST',
    path: '/isloggedin',
    config: {
      auth: 'jwt',
      handler: function(request, reply) {
        co(function *(){
          console.log("/isloggedin");
          let token = request.headers.authorization;
          let user = yield db.collection('user').find({ token: token }).toArray();
          console.log(user);
          if (user.length > 0) {
            return reply({ success: true }).code(200);
          } else {
            return reply({ success: false }).code(400);
          }
        });
      }
    }
  });

  // =========== [ LOGIN ] ===========
  server.route({
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      validate: {
        payload: {
          username: Joi.string().required(),
          password: Joi.string().min(2).max(200).required()
        }
      },
      handler: function(request, reply) {
        co(function *(){
          const p = request.payload;
          console.log(p);
          let users = yield db.collection('user').find({
            username: p.username,
            password: p.password
          }).toArray();

          if (users.length > 0) {
            console.log("winner");
            let user = users[0];
            delete user.password;
            user.token = jwtGenerateAndSaveToken(user);
            return reply(user).code(200);
          } else {
            console.log("loser");
            return reply(Boom.unauthorized('Email/Passwort-Kombination nicht bekannt!'));
          }
        });
      }
    }
  });

  // =========== [ LOGOUT ] ===========
  server.route({
    method: 'POST',
    path: '/logout',
    config: {
      auth: 'jwt',
      handler: function(request, reply) {
        co(function *(){
          let token = request.headers.authorization;
          yield db.collection('user').update(
            { token: token },
            { $unset: { token: "" } }
          );
          return reply({ success: true }).code(200);
        });
      }
    }
  });


  // =========== [ NEXT ] ===========
  next();
};

// =========== [ EXPORT ] ===========
exports.register.attributes = {
  name: 'auth'
};
