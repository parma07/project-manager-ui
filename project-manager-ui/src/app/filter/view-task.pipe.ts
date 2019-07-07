import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../model/task.model';



@Pipe({
    name: 'viewTask'
    // ,pure:false
  })
export class ViewTaskPipe implements PipeTransform {
    transform(tasks: TaskModel[], searchString:String, parentTaskSearchString:String, startDateSearchString:string, endDateSearchString:string, projectSearchString:string): any [] {    
        //console.log('val',searchString, parentTaskSearchString);
        if (!searchString && !parentTaskSearchString && !startDateSearchString && !endDateSearchString && !projectSearchString) {
          return tasks;
        }
        if(searchString){
          return tasks.filter(t => {
            return (t.taskName.toLowerCase().startsWith(searchString.toLowerCase()));             
          } )
        };
        if(parentTaskSearchString){
          return tasks.filter(t => {              
            return (t.parentTask.parentTask.toLowerCase().startsWith(parentTaskSearchString.toLowerCase()));
           }
          );
        };
        if(startDateSearchString){
          return tasks.filter(t =>{
            return (t.startDate.startsWith(startDateSearchString));
          })
        };
       if(endDateSearchString){
        return tasks.filter(t => {
          return (t.endDate.startsWith(endDateSearchString));
        })
       };
       if(projectSearchString){
        return tasks.filter(t =>{
          return (t.projectId.startsWith(projectSearchString));
        })
      };
      }
}