import {Component, OnInit} from '@angular/core';
import { ProjectModel } from '../model/project.model';
import { AppService } from '../service/app.service';
import { DatePipe } from '@angular/common';


@Component({
    selector:'project',
    templateUrl: './project.component.html',
    styleUrls : ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
    project : ProjectModel;
    projectList : ProjectModel[];
    checkboxValue: boolean;
    datePipe: DatePipe = new DatePipe("en-US");

    ngOnInit(){
        this.getAllProject();
    }

    getAllProject(){
        this._appService.getProjects()
        .subscribe(res => {
        this.projectList = res.outData;
        console.log("from add Porject component:"+this.projectList);
        });
    }
    
    constructor(private _appService: AppService) { 
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
        console.log("Project Form Submitted"+this.project.project);
        this._appService.saveProject(this.project).subscribe(res => {

        });
    }

    public reset():void{
        console.log("Project Form reset");
        this.project.project='';
        this.project.manager='';
        this.project.priority='';
       
    }
}