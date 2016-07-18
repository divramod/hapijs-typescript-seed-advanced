/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";
let assert = chai.assert;

import server from "../../src/server";
import UserController from '../../src/controllers/userController';
import UserRepository from '../../src/libs/repository/mongo/userRepository';

describe("user/", function() {

  const userController = new UserController(server, new UserRepository());

  it("create/", function(done) {
    userController.authenticate().then((user) => {
      // authenticate user by creating a valid JSON Web Token
      console.log("user", user);
      return {bla: "blup"};
    })
    .then((user) => {
      const request = {
      method: 'POST',
      url: '/users/',
      payload: {
        'metaData': {
          'title': 'Test Title',
          'location': 'Rome',
        },
      }
      };
      return server.inject(request);
    })
    .then((response) => {
      // do assertions on response
      done();
    })
    .catch(done);
  });
});
