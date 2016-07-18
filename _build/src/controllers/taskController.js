"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boom = require("boom");
var Joi = require("joi");
var baseController_1 = require('./baseController');
var TaskModel = require('../models/taskModel');
var taskController = (function (_super) {
    __extends(taskController, _super);
    function taskController(server, taskRepository) {
        _super.call(this, server);
        this.taskRepository = taskRepository;
    }
    taskController.prototype.createTask = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var newTask = request.payload;
                console.log(newTask);
                _this.taskRepository.create(newTask).then(function (task) {
                    reply(task).code(201);
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'tasks'],
            description: 'Create a task.',
            validate: {
                payload: TaskModel.createTaskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '201': {
                            'description': 'Created Task.',
                            'schema': TaskModel.taskModel
                        }
                    }
                }
            }
        };
    };
    taskController.prototype.updateTask = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var id = request.params["id"];
                _this.taskRepository.findById(id).then(function (task) {
                    if (task) {
                        var updateTask = request.payload;
                        task.completed = updateTask.completed;
                        task.description = updateTask.description;
                        task.name = updateTask.name;
                        _this.taskRepository.findByIdAndUpdate(id, task).then(function (updatedTask) {
                            reply(updatedTask);
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
            tags: ['api', 'tasks'],
            description: 'Update task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: TaskModel.updateTaskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                            'schema': TaskModel.taskModel
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        };
    };
    taskController.prototype.deleteTask = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var id = request.params["id"];
                _this.taskRepository.findById(id).then(function (task) {
                    if (task) {
                        _this.taskRepository.findByIdAndDelete(id).then(function () {
                            reply(task);
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
            tags: ['api', 'tasks'],
            description: 'Delete task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: TaskModel.taskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Deleted Task.',
                            'schema': TaskModel.taskModel
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        };
    };
    taskController.prototype.getTaskById = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var id = request.params["id"];
                console.log(id);
                _this.taskRepository.findById(id).then(function (task) {
                    if (task) {
                        reply(task);
                    }
                    else {
                        reply(Boom.notFound());
                    }
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'tasks'],
            description: 'Get task by id.',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            },
            response: {
                schema: TaskModel.taskModel
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Task founded.'
                        },
                        '404': {
                            'description': 'Task does not exists.'
                        }
                    }
                }
            }
        };
    };
    taskController.prototype.getTasks = function () {
        var _this = this;
        return {
            handler: function (request, reply) {
                var top = request.query.top;
                var skip = request.query.skip;
                _this.taskRepository.find({}, top, skip).then(function (tasks) {
                    reply(tasks);
                }).catch(function (error) {
                    reply(Boom.badImplementation(error));
                });
            },
            tags: ['api', 'tasks'],
            description: 'Get all tasks.',
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
                            'description': 'Returned Tasks.',
                            'schema': TaskModel.taskModel
                        }
                    }
                }
            }
        };
    };
    return taskController;
}(baseController_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = taskController;

//# sourceMappingURL=taskController.js.map
