/// <reference path="../typings/index.d.ts" />
"use strict";
var chai = require("chai");
var taskRepository_1 = require("../src/libs/repository/mongo/taskRepository");
var assert = chai.assert;
describe("TaskRepository", function () {
    it("Create a task", function (done) {
        var repo = new taskRepository_1.default();
        var task = {
            _id: undefined,
            name: "task",
            description: "teste",
            completed: false,
            createdDate: undefined,
            updatedAt: undefined
        };
        repo.create(task).then(function (createdTask) {
            assert.isNotNull(task._id);
            assert.isNotNull(task.createdDate);
            done();
        }).catch(function (error) {
            done(error);
        });
    });
});

//# sourceMappingURL=TaskRepositoryTests.js.map
