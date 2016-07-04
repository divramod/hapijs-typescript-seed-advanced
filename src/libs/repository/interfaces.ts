
export interface IEntity {
    _id: string;
    createdDate: Date;
    updatedAt: Date;
}

export interface IRepository<T extends IEntity> {
    findById(id: string): Promise<T>;
    findByIdAndDelete(id: string): Promise<T>;
    findByIdAndUpdate(id: string, entity: T): Promise<T>;
    find(filter: Object, top?: number, skip?: number): Promise<Array<T>>;
    create(entity: T): Promise<T>; 
}

// ========================== [ Entities ] ==========================
export interface ITask extends IEntity {
    name: string;
    description: string;
    completed: boolean;
}


export interface IDoor extends IEntity {
    name: string;
    description: string;
    completed: boolean;
    opened: boolean;
}


// ========================== [ Interfaces ] ==========================

export interface ITaskRepository extends IRepository<ITask> {

}

export interface IDoorRepository extends IRepository<ITask> {

}
