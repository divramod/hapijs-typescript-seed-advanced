/// <reference path="../../typings/index.d.ts" />

import * as chai from "chai";
let assert = chai.assert;

import server from "../../src/server";

describe("my base test", function() {
  it("base test", function(done) {
    var p1 = new Promise(function(resolve, reject) {
    setTimeout(
        function() {
          resolve(1)
        }, Math.random() * 2 + 1);
    });
    p1.then((user) => {
      // authenticate user by creating a valid JSON Web Token
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
