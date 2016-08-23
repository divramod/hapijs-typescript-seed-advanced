/// <reference path="../../typings/index.d.ts" />
import * as chai from "chai";
let assert = chai.assert;

import server from "../../src/server";
import UserController from '../../src/controllers/userController';
import UserRepository from '../../src/libs/repository/mongo/userRepository';
import {IUser, IUserActivation, IUserCreate} from "../../src/libs/repository/interfaces";

describe("ROUTE /api/user", function() {

  const userController = new UserController(server, new UserRepository());

  // ========================== [ ACTIVATE ] ==========================
  it("/activate: should activate a user", function() {
    // TODO: create a user
    // TODO: get user _id 
    // TODO: get token
    // TODO: delete the created User
    let user: IUserActivation = {
      '_id': '1234566737465',
      'token': '123234523542345'
    };

    let url = '/api/users/' + user._id + '/' + user.token;
    const request = {
      method: 'PUT',
      url: url,
      payload: user
    };

    return server.inject(request).then((response) => {
      let res = JSON.parse(response.payload);
      assert.strictEqual(res.success, false, '/users/{id}/{token}')
      chai.expect(res.success).to.deep.equal(false);
      //chai.expect(res.success).to.deep.equal(true);
    });
  });

  // ========================== [ CREATE ] ==========================
  it("/create: should create a user", function() {
    let user: IUserCreate = {
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

    return server.inject(request).then((response) => {
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
    });

  });
});
