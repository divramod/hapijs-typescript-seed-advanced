/// <reference path="../../typings.d.ts" />
import {IRepositoryConfig,IServerConfig} from "./interfaces"
var db = process.env.db || 'production';

export default class Configurations {
  public static get Repository():IRepositoryConfig 
  { 
    let connectionString = "mongodb://localhost/testingdb"
    if (db !== 'testing')
      connectionString =  "mongodb://localhost/locationdb"

    return {
      connectionString: connectionString
    }
  }
  public static get Server():IServerConfig 
  { 
    return {
      port: 8100
    }
  }
}
