/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";
let assert = chai.assert;

import server from "../../src/server";
import UserController from '../../src/controllers/userController';
import UserRepository from '../../src/libs/repository/mongo/userRepository';
import {IUser} from "../../src/libs/repository/interfaces";

describe("route user/create POST", function() {

  const userController = new UserController(server, new UserRepository());

  it("should create a user", function(done) {
    let user: IUser = {
        'username': 'divramod',
        'name': 'Petermann',
        'forename': 'Arvid',
        'email': 'arvidpetermann@gmail.com',
        'telefon': '017620158302'
      }
    const request = {
      method: 'POST',
      url: '/api/users',
      payload: user
    };

    server.inject(request).then((response) => {
      let res = JSON.parse(response.payload);

      assert.strictEqual(user.email, res.email, 'email')
      assert.strictEqual(user.username, res.username, 'username')
      assert.strictEqual(user.name, res.name, 'name')
      assert.strictEqual(user.forename, res.forename, 'forename')
      assert.isNumber(res.telefon, 'telefon should be a number')

      assert.isString(res._id, '_id should be a string')
      assert.isDefined(res._id, '_id should be defined')
      assert.strictEqual(res._id.length, 36, 'lenght of id should be 36')
      assert.isDefined(res.createdDate, 'createdDate should be defined')
      done();
    }).catch((error) => {
      console.log(error);
    });

  });
});
