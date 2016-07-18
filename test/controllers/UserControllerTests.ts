/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";

import server from "../../src/server";

import UserRepository from "../../src/libs/repository/mongo/userRepository";
import UserController from '../../src/controllers/userController';
import {IUser} from "../../src/libs/repository/interfaces";

let assert = chai.assert;

describe("UserController", function() {

  it("authenticate()", function(done) {
    const userController = new UserController(server, new UserRepository());
    const userRepository = new UserRepository();

    var user: IUser = {
      _id: undefined,
      username: "user",
      name: "teste",
      forename: "teste",
      email: "user",
      createdDate: undefined,
      updatedAt: undefined
    };

    userRepository.create(user).then((createdUser) => {
      return userController.authenticate(createdUser);
    }).then((authenticatedUser) => {
      assert.isTrue(false, 'is not true');
      done();
    }).catch((error) => {
      console.log(error);
      done(error);
    });
  });

});
