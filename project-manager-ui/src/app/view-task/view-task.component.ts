import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppService } from '../service/app.service';
import { TaskModel } from '../model/task.model';
import { ProjectModel } from '../model/project.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SearchFilter } from '../model/search-filter.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector :'view-task',
    templateUrl :'./view-task.component.html',
    styleUrls : ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{
    sortingName: string;
    isDesc: boolean;
    modalRef: BsModalRef;
    taskList: TaskModel[];
    searchString:string;
    searchFilter: SearchFilter = new SearchFilter();
    projectList : ProjectModel[];
    project : ProjectModel;
    closeResult: string;
    parentTaskSearchString:String;
    projectSearchString:string;
    index:number;
    isDisabled:boolean = true;
    filterData:TaskModel= new TaskModel();
    
    constructor(private _appService: AppService, private modalService: BsModalService, private modalServiceProject: NgbModal) {    }

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

      getAllProject(){
        this._appService.getProjects()
        .subscribe(res => {
        this.projectList = res.outData;
        //console.log("from add Porject component:"+this.projectList);
        });
    }

    getTask() {    
        this._appService.getTasks()
            .subscribe(res => {
            this.taskList = res.outData;
            //console.log("from view task component:"+this.taskList);
          });          
    }

    saveOrUpdateTask(i) : void {
      this._appService.saveTask(this.taskList[i]).subscribe(res => {        
        this.modalRef.hide();
      })
    }

    public endTask(taskId:string){
      let task = new TaskModel();
      task.taskId=taskId;
      task.editEnabled='Y';
      this._appService.editTask(task).subscribe(res => {      
      })
    }

    sort(name: string): void {
      console.log("sort project list by "+name);
      if (name && this.sortingName !== name) {
        this.isDesc = false;
      } else {
        this.isDesc = !this.isDesc;
      }
      this.sortingName = name;
    } 

    open(content: any) {
      this.getAllProject();
      this.modalServiceProject.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((response) => {
        this.closeResult = `Closed with: ${response}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
    
}

