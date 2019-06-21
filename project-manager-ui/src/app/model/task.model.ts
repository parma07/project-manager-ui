import { ParentTaskModel } from './parent-task.model';

export class TaskModel{
    taskId:string;
    taskName:string;
    priority:string;
    parentTask:ParentTaskModel;
    startDate:string;
    endDate:string;
    editEnabled:string;
    // below fields are used for filtering data
    priorityFrom:number;
    priorityTo:number;
}

 