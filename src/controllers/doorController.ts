/// <reference path="../../typings.d.ts" />
import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Joi from "joi";
import BaseController from './baseController';
import * as DoorModel from '../models/doorModel';
import { IDoor, IDoorRepository } from '../libs/repository/interfaces'
var Gpio = require('onoff').Gpio;

export default class doorController extends BaseController {
  private doorRepository: IDoorRepository;

  constructor(server: Hapi.Server, doorRepository: IDoorRepository) {
    super(server);
    this.doorRepository = doorRepository;
    console.log("door controller");
    this.createDoorWatchers(server);
  }

  private createDoorWatchers(server) {
    this.doorRepository.find({}, 0, 0).then((doors: Array<IDoor>) => {
      for (let i = 0, len = doors.length; i < len; i++) {
        let door = doors[i];
        console.log(door);
        let ledPin = parseInt(door.name) + 10;
        let buttonPin = parseInt(door.name);
        //console.log("ledPin ", ledPin );
        //console.log("buttonPin ", buttonPin );
        try {
          // create led/button pairs
          server.app.leds[ledPin] = new Gpio(ledPin, 'out');
          server.app.buttons[buttonPin] = new Gpio(buttonPin, 'in', 'both');

          // create watcher
          server.app.buttons[buttonPin].watch(function (err, value) {
            if (err) {
              throw err;
            }

            if (value) {
              console.log("button " + buttonPin + " pressed");
            } else {
              console.log("button " + buttonPin + " released");
            }
            server.app.leds[ledPin].writeSync(value);
          });

          // create unexport
          process.on('SIGINT', function () {
            server.app.leds[ledPin].unexport();
            server.app.buttons[buttonPin].unexport();
          });

        } catch (e) {
          console.log("no gpio");
        }

      }
    }).catch((error) => {
      console.log("problem: ", error);
    });
  }

  public createDoor(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        var newDoor: IDoor = request.payload;
        console.log(newDoor);

        this.doorRepository.create(newDoor).then((door) => {
          reply(door).code(201);
        }).catch((error) => {
          reply(Boom.badImplementation(error));
        });
      },
      tags: ['api', 'doors'],
      description: 'Create a door.',
      validate: {
        payload: DoorModel.createDoorModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': 'Created Door.',
              'schema': DoorModel.doorModel
            }
          }
        }
      }
    }
  }

  public updateDoor(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const id = request.params["id"]

        this.doorRepository.findById(id).then((door: IDoor) => {
          if (door) {
            var updateDoor: IDoor = request.payload;

            door.completed = updateDoor.completed;
            door.description = updateDoor.description;
            door.name = updateDoor.name;

            this.doorRepository.findByIdAndUpdate(id, door).then((updatedDoor: IDoor) => {
              reply(updatedDoor);
            }).catch((error) => {
              reply(Boom.badImplementation(error));
            });
          } else {
            reply(Boom.notFound());
          }
        }).catch((error) => {
          reply(Boom.badImplementation(error));
        });
      },
      tags: ['api', 'doors'],
      description: 'Update door by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: DoorModel.updateDoorModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Deleted Door.',
              'schema': DoorModel.doorModel
            },
            '404': {
              'description': 'Door does not exists.'
            }
          }
        }
      }
    };
  }

  public deleteDoor(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const id = request.params["id"]

        this.doorRepository.findById(id).then((door: IDoor) => {
          if (door) {
            this.doorRepository.findByIdAndDelete(id).then(() => {
              reply(door);
            }).catch((error) => {
              reply(Boom.badImplementation(error));
            });
          } else {
            reply(Boom.notFound());
          }
        }).catch((error) => {
          reply(Boom.badImplementation(error));
        });
      },
      tags: ['api', 'doors'],
      description: 'Delete door by id.',
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      response: {
        schema: DoorModel.doorModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Deleted Door.',
              'schema': DoorModel.doorModel
            },
            '404': {
              'description': 'Door does not exists.'
            }
          }
        }
      }
    };
  }

  public getDoorById(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const id = request.params["id"]
        console.log(id);
        this.doorRepository.findById(id).then((door: IDoor) => {
          if (door) {
            reply(door);
          } else {
            reply(Boom.notFound());
          }
        }).catch((error) => {
          reply(Boom.badImplementation(error));
        });
      },
      tags: ['api', 'doors'],
      description: 'Get door by id.',
      validate: {
        params: {
          id: Joi.string().required()
        }
      },
      response: {
        schema: DoorModel.doorModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              'description': 'Door founded.'
            },
            '404': {
              'description': 'Door does not exists.'
            }
          }
        }
      }
    }
  }

  public getDoors(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        var top = request.query.top;
        var skip = request.query.skip;

        this.doorRepository.find({}, top, skip).then((doors: Array<IDoor>) => {
          reply(doors);
        }).catch((error) => {
          reply(Boom.badImplementation(error));
        });
      },
      tags: ['api', 'doors'],
      description: 'Get all doors.',
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
              'description': 'Returned Doors.',
              'schema': DoorModel.doorModel
            }
          }
        }
      }
    };
  }
}
