import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { TaskModel } from '../model/task.model';
import { ParentTaskModel } from '../model/parent-task.model';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';


@Component({
    selector :'add-task',
    templateUrl : './add-task.component.html',
    styleUrls : ['./add-task.component.scss']
    
})
export class AddTaskComponent implements OnInit{
    task: TaskModel;

    ngOnInit(){}

    constructor(private _appService: AppService) { 
        this.task = new TaskModel();
        this.task.priority='0';
        this.task.parentTask = new ParentTaskModel();
      }

    public saveOrUpdateTask(): void {
        console.log("task data"+this.task.taskName);
        this._appService.saveTask(this.task).subscribe(res => { 
           // this.alert.msg= res.outData;
        })
    }

    public reset():void{
        this.task.endDate='';
        this.task.startDate='';
        this.task.priority='0';
        this.task.taskName='';
        this.task.parentTask.parentTask=''
        this.task.parentTask.parentId='';
        //this.alert.msg='';
      }



}