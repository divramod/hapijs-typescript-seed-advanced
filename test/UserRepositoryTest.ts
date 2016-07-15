/// <reference path="../typings/index.d.ts" />

import * as chai from "chai";
import UserRepository from "../src/libs/repository/mongo/userRepository";
import {IUser} from "../src/libs/repository/interfaces";

let assert = chai.assert;

describe("UserRepository", function() {
  it("Create a user", function(done) {
    var repo = new UserRepository();

    var user: IUser = {
      _id: undefined,
      name: "user",
      description: "teste",
      completed: false,
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
