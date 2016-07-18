"use strict";
var taskController_1 = require('../controllers/taskController');
var taskRepository_1 = require('../libs/repository/mongo/taskRepository');
var userController_1 = require('../controllers/userController');
var userRepository_1 = require('../libs/repository/mongo/userRepository');
function default_1(server) {
    // ========================== [ task ] ==========================
    var taskController = new taskController_1.default(server, new taskRepository_1.default());
    server.route({
        method: 'GET',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: taskController.getTaskById()
    });
    server.route({
        method: 'GET',
        path: '/api/tasks',
        handler: undefined,
        config: taskController.getTasks()
    });
    server.route({
        method: 'DELETE',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: taskController.deleteTask()
    });
    server.route({
        method: 'PUT',
        path: '/api/tasks/{id}',
        handler: undefined,
        config: taskController.updateTask()
    });
    // ========================== [ user ] ==========================
    var userController = new userController_1.default(server, new userRepository_1.default());
    server.route({
        method: 'GET',
        path: '/api/users/{id}',
        handler: undefined,
        config: userController.getUserById()
    });
    server.route({
        method: 'GET',
        path: '/api/users',
        handler: undefined,
        config: userController.getUsers()
    });
    server.route({
        method: 'DELETE',
        path: '/api/users/{id}',
        handler: undefined,
        config: userController.deleteUser()
    });
    server.route({
        method: 'PUT',
        path: '/api/users/{id}',
        handler: undefined,
        config: userController.updateUser()
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;

//# sourceMappingURL=index.js.map
