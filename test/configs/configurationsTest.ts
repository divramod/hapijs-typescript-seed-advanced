/// <reference path="../../typings/index.d.ts" />
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const expect = Code.expect;

import Configurations from './../../src/configs/configurations';

lab.experiment('configs/configExampleTest.ts', () => {

  lab.it('process.env.db = "testing"', (done) => {
    let db = process.env.db;
    process.env.db = 'testing';
    let repository = Configurations.Repository;
    expect(repository.connectionString).to.equal('mongodb://localhost/testingdb');
    process.env.db = db;
    done();
  });

  lab.it('process.env.db = undefined', (done) => {
    const db = process.env.db;
    delete process.env.db;
    let repository = Configurations.Repository;
    expect(repository.connectionString).to.equal('mongodb://localhost/productiondb');
    process.env.db = db;
    done();
  });

  lab.it('process.env.env = undefined', (done) => {
    const env = process.env.env;
    delete process.env.env;
    let server = Configurations.Server;
    expect(server.env).to.equal('production');
    process.env.env = env;
    done();
  });

  lab.it('process.env.env = "testing"', (done) => {
    const env = process.env.env = 'testing';
    let server = Configurations.Server;
    expect(server.env).to.equal('testing');
    done();
  });

  lab.it('process.env.port = 8100', (done) => {
    const port = process.env.port;
    delete process.env.port;
    const server = Configurations.Server;
    expect(server.port).to.equal(8100);
    process.env.port = port;
    done();
  });

  lab.it('process.env.port = THE_CHOOSEN_ONE', (done) => {
    const port = process.env.port;
    const server = Configurations.Server;
    expect(server.port).to.equal(port);
    done();
  });

});
