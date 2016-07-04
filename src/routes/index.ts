import * as Hapi from "hapi";
import TaskController from '../controllers/taskController';
import TaskRepository from '../libs/repository/mongo/taskRepository';
import DoorController from '../controllers/doorController';
import DoorRepository from '../libs/repository/mongo/doorRepository';

export default function(server: Hapi.Server) {

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

    const doorController = new DoorController(server, new DoorRepository());

    server.route({
        method: 'GET',
        path: '/api/doors/{id}',
        handler: undefined,
        config: doorController.getDoorById()
    });

    server.route({
        method: 'GET',
        path: '/api/doors',
        handler: undefined,
        config: doorController.getDoors()
    });

    server.route({
        method: 'DELETE',
        path: '/api/doors/{id}',
        handler: undefined,
        config: doorController.deleteDoor()
    });

    server.route({
        method: 'PUT',
        path: '/api/doors/{id}',
        handler: undefined,
        config: doorController.updateDoor()
    });

    server.route({
        method: 'POST',
        path: '/api/doors',
        handler: undefined,
        config: doorController.createDoor()
    });
}
