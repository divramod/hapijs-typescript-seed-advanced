/// <reference path="../../typings/index.d.ts" />
const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Hapi = require('hapi');

import server from "../../src/server";

const expect = Code.expect;

lab.describe('misc/routesTest.ts', function () {

  lab.it('returns the response result', (done) => {

    server.inject('/', function (res) {
      expect(res.statusCode).to.equal(404);
      done();
    });

  });

});
