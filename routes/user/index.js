'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;
  const users = db.collection('users');

  // =========== [ LIST ] ===========
  server.route({
    method: 'GET',
    path: '/users',
    handler: function(request, reply) {

      users.find((err, docs) => {
        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }
        reply(docs);
      });

    },
    config: {
      auth: false
    }
  });

  // =========== [ READ ] ===========
  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: function(request, reply) {

      users.findOne({
        _id: request.params.id
      }, (err, doc) => {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        if (!doc) {
          return reply(Boom.notFound());
        }

        delete doc.password;

        reply(doc);
      });
    },
    config: {
      auth: false
    }
  });

  // =========== [ CREATE ] ===========
  server.route({
    method: 'POST',
    path: '/users',
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['admin']
      },
      validate: {
        payload: {
          email: Joi.string().min(1).max(50).required(),
          forename: Joi.string(),
          surename: Joi.string(),
          password: Joi.string().min(2).max(200).required()
        }
      }
    },
    handler: function(request, reply) {

      const user = request.payload;

      //Create an id
      user._id = uuid.v1();

      users.save(user, (err, user) => {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        reply(user);
      });
    }
  });

  // =========== [ UPDATE ] ===========
  server.route({
    method: 'PATCH',
    path: '/users/{id}',
    config: {
      validate: {
        payload: Joi.object({
          email: Joi.string().min(10).max(50).optional(),
          forename: Joi.string().min(10).max(50).optional(),
          surename: Joi.number().optional()
        }).required().min(1)
      }
    },
    handler: function(request, reply) {

      users.update({
        _id: request.params.id
      }, {
        $set: request.payload
      }, function(err, user) {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        if (user.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });
    }
  });

  // =========== [ DELETE ] ===========
  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    config: { auth: 'jwt' },
    handler: function(request, reply) {

      users.remove({
        _id: request.params.id
      }, function(err, user) {

        if (err) {
          return reply(Boom.badData('Internal MongoDB error', err));
        }

        if (user.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });
    }
  });

  // =========== [ NEXT ] ===========
  return next();
};

exports.register.attributes = {
  name: 'routes-users'
};
