/// <reference path="../../typings/index.d.ts" />
const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Hapi = require('hapi');
const expect = Code.expect;

import server from "../../src/server";
import TaskController from '../../src/controllers/taskController';
import TaskRepository from '../../src/libs/repository/mongo/taskRepository';
import {ITask} from "../../src/libs/repository/interfaces";

lab.describe('routes/tasksRoutesTest.ts', function () {
  const taskController = new TaskController(server, new TaskRepository());

  lab.it('returns the response result', function (done) {

    const task = {
      name: 'hello',
      description: 'hello description',
      completed: true
    }

    const options = {
      method: 'POST',
      url: '/api/tasks',
      payload: task
    }

    server.inject(options, function (res) {
      console.log(res.result);
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal('hello');
      done();
    });
  });
});
