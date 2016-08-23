/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";

import server from "../../src/server";

import UserController from '../../src/controllers/userController';
import UserRepository from '../../src/libs/repository/mongo/userRepository';
import {IUser} from "../../src/libs/repository/interfaces";

let assert = chai.assert;

describe("REPOSITORY User", function() {

  it("Authenticate a User", function(done) {
    const userController = new UserController(server, new UserRepository());
    const user = {
        'username': 'divramod',
        'name': 'Petermann',
        'forename': 'Arvid',
        'email': 'arvidpetermann@gmail.com',
        'telefon': '017620158302'
      }
    userController.authenticate(user).then((user) => {
      //console.log(user);
      done();
    }).catch((error) => {
      //console.log(error);
      done(error);
    });
  });

  it("Create a user", function(done) {
    var repo = new UserRepository();

    var user: IUser = {
      _id: undefined,
      username: "user",
      name: "teste",
      forename: "teste",
      email: "user",
      telefon: "017625322",
      createdDate: undefined,
      updatedAt: undefined
    };

    repo.create(user).then((createdUser) => {
      assert.isNotNull(user._id);
      assert.isNotNull(user.createdDate);
      done();
    }).catch((error) => {
      done(error);
    });
  });
});
