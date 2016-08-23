import * as Hapi from "hapi";
import TaskController from '../controllers/taskController';
import TaskRepository from '../libs/repository/mongo/taskRepository';
import UserController from '../controllers/userController';
import UserRepository from '../libs/repository/mongo/userRepository';


export default function(server: Hapi.Server) {

  // ========================== [ task ] ==========================

  const taskController = new TaskController(server, new TaskRepository());

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

  server.route({
    method: 'POST',
    path: '/api/tasks',
    handler: undefined,
    config: taskController.createTask()
  });

  // ========================== [ user ] ==========================

  const userController = new UserController(server, new UserRepository());

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

  server.route({
    method: 'PUT',
    path: '/api/users/{id}/{token}',
    handler: undefined,
    config: userController.activateUser()
  });

  server.route({
    method: 'POST',
    path: '/api/users',
    handler: undefined,
    config: userController.createUser()
  });

}
