/// <reference path="../../../../typings.d.ts" />
import {IPlugin} from '../interfaces'
import * as Hapi from 'hapi'
const env = process.env.env || 'production';

export default (): IPlugin => {

  return {
    register: (server: Hapi.Server) => {

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
        name: "Emial Plugin",
        version: "0.0.1"
      };
    }
  }
};
