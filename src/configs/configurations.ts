import {IRepositoryConfig,IServerConfig} from "./interfaces"

 export default class Configurations {
    
     public static get Repository():IRepositoryConfig 
     { 
         return {
             connectionString: "mongodb://localhost/locationdb"
         }
     }
     
     public static get Server():IServerConfig 
     { 
         return {
             port: 8100
         }
     }
}

