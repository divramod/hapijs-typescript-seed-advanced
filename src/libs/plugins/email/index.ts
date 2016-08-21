/// <reference path="../../../../typings.d.ts" />
import {IPlugin} from '../interfaces'
import * as Hapi from 'hapi'
const env = process.env.env || 'production';

const emailPlugin = {
    register: function (server, options, next) {
        next();
    }
};
emailPlugin.register.attributes = {
    name: 'emailPlugin',
    version: '1.0.0'
};

let events = {};
events = { error: '*' };
if (env !== 'testing')
  events = { error: '*', log: '*', response: '*', request: '*' };

const opts = {
  opsInterval: 1000,
  reporters: [{
    reporter: require('good-console'),
    events: events
  }]
};

export default (): IPlugin => {

  return {
    register: (server: Hapi.Server) => {

      server.register({
        register: emailPlugin,
        options: opts
      }, (error) => {
        if (error) {
          console.log('error', error);
        }
      });
    },
    info: () => {
      return {
        name: "Email Plugin",
        version: "0.0.1"
      };
    }
  }
};
