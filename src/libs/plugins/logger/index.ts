/// <reference path="../../../../typings.d.ts" />
import {IPlugin} from '../interfaces'
import * as Hapi from 'hapi'
const Good = require('good');
const GoodConsole = require('good-console');
const env = process.env.env || 'production';

export default (): IPlugin => {

  return {
    register: (server: Hapi.Server) => {

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

      server.register({
        register: Good,
        options: opts
      }, (error) => {
        if (error) {
          console.log('error', error);
        }
      });
    },
    info: () => {
      return {
        name: "Good Logger",
        version: "1.0.0"
      };
    }
  }
};
