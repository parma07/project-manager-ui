import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { TaskModel } from '../model/task.model';
import { UserModel } from '../model/user.model';
import { ParentTaskModel } from '../model/parent-task.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModel } from '../model/project.model';


@Component({
    selector :'add-task',
    templateUrl : './add-task.component.html',
    styleUrls : ['./add-task.component.scss']
    
})
export class AddTaskComponent implements OnInit{    
    closeResult: string;
    task: TaskModel;
    userList : UserModel[];
    parentTaskList : ParentTaskModel[];
    projectList : ProjectModel[];
    alert: any = {
        type: 'success',
        msg: '',
        timeout: 5000
      };

    ngOnInit(){
      this.getParentTaskList();
      this.findAllActiveProjects();
      this.getUserList();
    }

    constructor(private _appService: AppService, private modalService: NgbModal) { 
        this.task = new TaskModel();
        this.task.priority='0';
        this.task.parentTask = new ParentTaskModel();
      }

    public saveOrUpdateTask(): void {
        console.log("task data"+this.task.taskName);
        this._appService.saveTask(this.task).subscribe(res => { 
           this.alert.msg= res.outData;
        })
    }

    public reset():void{
        this.task.endDate='';
        this.task.startDate='';
        this.task.priority='0';
        this.task.taskName='';
        this.task.parentTask.parentTask=''
        this.task.parentTask.parentId='';
        this.alert.msg='';
      }

      open(content: any) {
        console.log("sort project list by "+content);
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((response) => {
          console.log("response.Project");
          console.log("ProjectId:" + response['project'] + "," + response['firstName'] + "," + response['parentTask']);
    
          if (response['project']) {
            console.log("response.Project:::::::"+response.project);
            this.task.projectId=response.project;
            //this.setFormValueProjectId(response);
          } else if (response['firstName']) {
            this.task.userId=response.firstName+" "+response.lastName;
            //this.setFormValueUserId(response);
          } else if (response['parentTask']) {
            console.log("response.Project:::::::"+response.parentTask);
            this.task.parentTask.parentTask=response.parentTask;
            //this.setFormValueParentTaskId(response);
          }
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

      private getParentTaskList() {
        console.log("inside get parent list");
        this._appService.getAllParentTasks()
        .subscribe((res: any) => {
          this.parentTaskList = res.outData;
          console.log("from getParentTaskList() Parent Task List:"+this.parentTaskList);
        });
      }
    
      private getUserList() {
        console.log("inside get user list");
        this._appService.getAllUsersWithNoProject()
        .subscribe(res => {
            this.userList = res.outData;
        console.log("from getUserList()  User List with no Project:"+this.userList);
        });
      }

      private findAllActiveProjects(){
        console.log("inside get Project list");
        this._appService.getProjects()
        .subscribe(res => {
            this.projectList = res.outData;
        console.log("from findAllActiveProjects() with Project:"+this.projectList);
        });
      }



}