import {Component, OnInit} from '@angular/core';
import { ProjectModel } from '../model/project.model';
import { UserModel } from '../model/user.model';
import { AppService } from '../service/app.service';
import { DatePipe } from '@angular/common';
import { SearchFilter } from '../model/search-filter.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { projection } from '@angular/core/src/render3';

@Component({
    selector:'project',
    templateUrl: './project.component.html',
    styleUrls : ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
    searchFilter: SearchFilter = new SearchFilter();    
    sortingName: string;
    isDesc: boolean;
    project : ProjectModel;
    projectList : ProjectModel[];
    projectManager : string;
    userList : UserModel[];
    checkboxValue: boolean;
    datePipe: DatePipe = new DatePipe("en-US");
    closeResult: string;
    manager: UserModel = new UserModel();
    tempUser: UserModel;
    editProject :boolean = false;
    alert: any = {
      type: 'success',
      msg: '',
      timeout: 5000
    };


    ngOnInit(){
        this.getAllProject();
    }

    getAllProject(){
        this._appService.getProjects()
        .subscribe(res => {
        this.projectList = res.outData;
        //console.log("from add Porject component:"+this.projectList);
        });
    }

    findAllUsersWithNoProject() {
        this._appService.getAllUsersWithNoProject()
        .subscribe(res => {
        this.userList = res.outData;
        //console.log("from add Porject component to get User List with no Project:"+this.userList);
        });
      }
    
    constructor(private _appService: AppService, private modalService: NgbModal) { 
        this.project = new ProjectModel();    
    }

    public setStartAndEndDate():void{        
        if (this.checkboxValue) {            
            let nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + 1);            
            this.project.startDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
            this.project.endDate = this.datePipe.transform(nextDate, 'yyyy-MM-dd');            
          } else {
            this.project.startDate = "";
            this.project.endDate = "";
          }
    }

    public saveOrUpdateProject() : void{        
        //console.log("Project Form Submitted"+this.project.project);
        //console.log("Project Form Submitted1"+this.project.manager);
        //console.log("this.project.editable:"+this.project.editable);
        if(this.project.editable !=null && this.project.editable == false){
          this.tempUser = this.userList.find(u => (u.firstName+" "+u.lastName)==this.project.manager);        
          //console.log("this.tempUser::::"+this.tempUser);
          this.project.manager = this.tempUser.userId;
        }       
        //console.log("Project Form Submitted2"+this.project.manager);
        this._appService.saveProject(this.project).subscribe(res => {
          this.alert.msg= res.status; 
        });
        this.getAllProject();
        this.reset();  
    }

    public suspendProject(project : ProjectModel): void {
      project.status = "SUSPENDED";
      this._appService.saveProject(project).subscribe(res => {
      });      
    }

    public activeProject(project : ProjectModel): void {
      project.status = "ACTIVE";
      this._appService.saveProject(project).subscribe(res => {
      });      
    }

    public reset():void{
        //console.log("Project Form reset");
        this.project.project='';
        this.project.manager='';
        this.project.priority='';
        this.project.startDate='';
        this.project.endDate='';
        this.checkboxValue=false;
       
    }

    sort(name: string): void {
        //console.log("sort project list by "+name);
        if (name && this.sortingName !== name) {
          this.isDesc = false;
        } else {
          this.isDesc = !this.isDesc;
        }
        this.sortingName = name;
      }      

      open(content: any) {
        //console.log("sort project list by "+content);
        this.findAllUsersWithNoProject();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((user) => {       
         this.project.manager=user.firstName+" "+user.lastName;        
          this.closeResult = `Closed with: ${user}`;
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

    private setFormValueUserId(selectedUser: UserModel) {        
      //console.log("selected User:"+selectedUser.userId);    
    }

    public availableForEdit(projectId : string):void{
      //console.log("projectid for edit:"+projectId);      
      this.project=this.projectList.find(p => p.projectId==projectId);
      this.project.editable=true;
    }

    
}