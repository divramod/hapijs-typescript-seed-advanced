/// <reference path="../../typings.d.ts" />
import {IRepositoryConfig,IServerConfig} from "./interfaces"

export default class Configurations {

  public static get Repository():IRepositoryConfig
  {
    const db = process.env.db || 'production';
    let connectionString = "mongodb://localhost/testingdb"
    if (db !== 'testing')
      connectionString =  "mongodb://localhost/productiondb"

    return {
      connectionString: connectionString
    }
  }

  public static get Server():IServerConfig
  {
    let port = process.env.port || 8100;
    if (process.env.port) {
      port = process.env.port;
    } else {
      port = 8100; 
    }
    let env = process.env.env || 'production';
    return {
      port: port,
      env: env
    }
  }
}
