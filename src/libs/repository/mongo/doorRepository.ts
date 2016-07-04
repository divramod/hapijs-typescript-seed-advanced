import {IDoor} from "../interfaces"
import MongoRepository from "./mongoRepository"

class DoorRepository extends MongoRepository<IDoor>  {
    constructor() {
        super();
    }  
    
     protected getCollectionName(): string {
         return "doors";
     }
}


export default DoorRepository;
