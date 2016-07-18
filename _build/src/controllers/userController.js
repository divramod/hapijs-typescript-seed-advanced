"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boom = require("boom");
var Joi = require("joi");
var baseController_1 = require('./baseController');
var UserModel = require('../models/userModel');
var userController = (function (_super) {
    __extends(userController, _super);
    function userController(server, userRepository) {
        _super.call(this, server);
        this.userRepository = userRepository;
    }
    userController.prototype.createUser = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var newUser = request.payload;
                console.log(newUser);
                _this.userRepository.create(newUser).then(function (user) {
                    reply(user).code(201);
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'users'],
            description: 'Create a user.',
            validate: {
                payload: UserModel.createUserModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'Created User.',
                            'schema': UserModel.userModel
                        }
                    }
                }
            }
        };
    };
    userController.prototype.updateUser = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var id = request.params["id"];
                _this.userRepository.findById(id).then(function (user) {
                    if (user) {
                        var updateUser = request.payload;
                        user.username = updateUser.username;
                        user.name = updateUser.name;
                        user.forename = updateUser.forename;
                        user.email = updateUser.email;
                        _this.userRepository.findByIdAndUpdate(id, user).then(function (updatedUser) {
                            reply(updatedUser);
                        }).catch(function (error) {
                            reply(Boom.badImplementation(error));
                        });
                    }
                    else {
                        reply(Boom.notFound());
                    }
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'users'],
            description: 'Update user by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: UserModel.updateUserModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted User.',
                            'schema': UserModel.userModel
                        },
                        '404': {
                            'description': 'User does not exists.'
                        }
                    }
                }
            }
        };
    };
    userController.prototype.deleteUser = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var id = request.params["id"];
                _this.userRepository.findById(id).then(function (user) {
                    if (user) {
                        _this.userRepository.findByIdAndDelete(id).then(function () {
                            reply(user);
                        }).catch(function (error) {
                            reply(Boom.badImplementation(error));
                        });
                    }
                    else {
                        reply(Boom.notFound());
                    }
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'users'],
            description: 'Delete user by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: UserModel.userModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted User.',
                            'schema': UserModel.userModel
                        },
                        '404': {
                            'description': 'User does not exists.'
                        }
                    }
                }
            }
        };
    };
    userController.prototype.getUserById = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var id = request.params["id"];
                console.log(id);
                _this.userRepository.findById(id).then(function (user) {
                    if (user) {
                        reply(user);
                    }
                    else {
                        reply(Boom.notFound());
                    }
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'users'],
            description: 'Get user by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: UserModel.userModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'User founded.'
                        },
                        '404': {
                            'description': 'User does not exists.'
                        }
                    }
                }
            }
        };
    };
    userController.prototype.getUsers = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var top = request.query.top;
                var skip = request.query.skip;
                _this.userRepository.find({}, top, skip).then(function (users) {
                    reply(users);
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'users'],
            description: 'Get all users.',
            validate: {
                query: {
                    top: Joi.number().default(5),
                    skip: Joi.number().default(0)
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Returned Users',
                            'schema': UserModel.userModel
                        }
                    }
                }
            }
        };
    };
    return userController;
}(baseController_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userController;

//# sourceMappingURL=userController.js.map
