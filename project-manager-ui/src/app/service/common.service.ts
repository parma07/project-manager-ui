/*
import { Injectable } from '@angular/core';
import { Task } from '../model/Task.model';
import { AppService } from './app.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CommonService {

    currentTask: string = 'add';
    task: Task = new Task();
    allTasks: Task[] = new Array<Task>();
    ngbTab: NgbTabset;

    constructor(private appService: AppService) { }

    getTasks() {
        this.appService.getTasks().subscribe(data => {
            console.log(data);
            this.allTasks = <Task[]>data;
            console.log('getTasks success:', this.allTasks);
        }, error => {
            console.log('getTasks error');
        });
    }

  

}
*/