/// <reference path="../../typings.d.ts" />
import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Joi from "joi";
import BaseController from './baseController';
import * as UserModel from '../models/userModel';
import { IUser, IUserActivation, IUserRepository } from '../libs/repository/interfaces'

export default class userController extends BaseController {
  private userRepository: IUserRepository;

  constructor(server: Hapi.Server, userRepository: IUserRepository) {
    super(server);
    this.userRepository = userRepository;
  }

  public authenticate(user) {

    var p1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(1)
      }, Math.random() * 2 + 1);
    });
    return p1;
  }

  public activateUser(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {

        // TODO: create token when creating user
        // TODO: search for user with stated id and token
        
        var userActivation: IUserActivation = request.payload;
        this.userRepository.find({_id: userActivation._id, token: userActivation.token}, 0, 0).then((users: Array<IUser>) => {
          if (users.length > 0) {
            reply({success: true});
          } else {
            reply({success: false});
          }
        }).catch((error) => {
          reply(Boom.badImplementation(error));
        });

      },
      tags: ['api', 'users'],
      description: 'Activate a user.',
      validate: {
        payload: UserModel.activateUserModel
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              'description': 'Activated User.',
              'schema': UserModel.userModel
            }
          }
        }
      }
    }
  
  }

  public createUser(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {

        var newUser: IUser = request.payload;
        this.userRepository.create(newUser).then((user) => {
          reply(user).code(201);
        }).catch((error) => {
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
    }
  }

  public updateUser(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const id = request.params["id"]

        this.userRepository.findById(id).then((user: IUser) => {
          if (user) {
            var updateUser: IUser = request.payload;

            user.username = updateUser.username;
            user.name = updateUser.name;
            user.forename = updateUser.forename;
            user.email = updateUser.email;

            this.userRepository.findByIdAndUpdate(id, user).then((updatedUser: IUser) => {
              reply(updatedUser);
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
  }

  public deleteUser(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const id = request.params["id"]

        this.userRepository.findById(id).then((user: IUser) => {
          if (user) {
            this.userRepository.findByIdAndDelete(id).then(() => {
              reply(user);
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
  }

  public getUserById(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        const id = request.params["id"]
        console.log(id);
        this.userRepository.findById(id).then((user: IUser) => {
          if (user) {
            reply(user);
          } else {
            reply(Boom.notFound());
          }
        }).catch((error) => {
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
    }
  }

  public getUsers(): Hapi.IRouteAdditionalConfigurationOptions {
    return {
      handler: (request: Hapi.Request, reply: Hapi.IReply) => {
        var top = request.query.top;
        var skip = request.query.skip;

        this.userRepository.find({}, top, skip).then((users: Array<IUser>) => {
          reply(users);
        }).catch((error) => {
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
  }
}
