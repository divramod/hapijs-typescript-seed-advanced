"use strict";
/// <reference path="../typings/index.d.ts" />
var chai = require("chai");
var userRepository_1 = require("../src/libs/repository/mongo/userRepository");
var assert = chai.assert;
describe("UserRepository", function () {
    it("Create a user", function (done) {
        var repo = new userRepository_1.default();
        var user = {
            _id: undefined,
            username: "user",
            name: "teste",
            forename: "teste",
            email: "user",
            createdDate: undefined,
            updatedAt: undefined
        };
        repo.create(user).then(function (createdUser) {
            assert.isNotNull(user._id);
            assert.isNotNull(user.createdDate);
            done();
        }).catch(function (error) {
            done(error);
        });
    });
});

//# sourceMappingURL=UserRepositoryTest.js.map
