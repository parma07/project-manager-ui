import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppService } from '../service/app.service';
import { TaskModel } from '../model/task.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



@Component({
    selector :'view-task',
    templateUrl :'./view-task.component.html',
    styleUrls : ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{
    modalRef: BsModalRef;
    taskList: TaskModel[];
    searchString:string;
    parentTaskSearchString:String;
    index:number;
    isDisabled:boolean = true;
    filterData:TaskModel= new TaskModel();
    
    constructor(private _appService: AppService, private modalService: BsModalService) {    }

     ngOnInit() {
        this.getTask();
    }

    openModal(template: TemplateRef<any>, i) {
        this.index = i;
        this.modalRef = this.modalService.show(template);
      }
    
      closeModal() {
        this.modalRef.hide();
       // this.alert.msg='';
        // this.index = null;
      }

    getTask() {    
        this._appService.getTasks()
            .subscribe(res => {
            this.taskList = res.outData;
            console.log("from view task component:"+this.taskList);
          });          
    }

    saveOrUpdateTask(i) : void {
      this._appService.saveTask(this.taskList[i]).subscribe(res => {
        console.log("parma");
        this.modalRef.hide();
      })
    }
    
}

