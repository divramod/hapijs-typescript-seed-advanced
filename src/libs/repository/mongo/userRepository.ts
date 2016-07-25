import {IUser} from "../interfaces"
import MongoRepository from "./mongoRepository"

class UserRepository extends MongoRepository<IUser>  {
  constructor() {
    super();
  }  
    
  protected getCollectionName(): string {
    return "users";
  }
}

export default UserRepository;
