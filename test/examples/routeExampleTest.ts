/// <reference path="../../typings/index.d.ts" />
const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Hapi = require('hapi');

import server from "../../src/server";
import UserController from '../../src/controllers/userController';
import UserRepository from '../../src/libs/repository/mongo/userRepository';
import {IUser, IUserActivation, IUserCreate} from "../../src/libs/repository/interfaces";

const expect = Code.expect;

lab.describe('misc/routesTest.ts', function () {
  const userController = new UserController(server, new UserRepository());

  lab.it('returns the response result', function (done) {

    var handler = function (request, reply) {

    return reply('hello');
    };

    var server = new Hapi.Server();
    server.connection();
    server.route({ 
      method: 'GET', 
      path: '/', 
      config: { handler: handler } 
    });

    server.inject('/', function (res) {

      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal('hello');
      done();
    });
  });
});
