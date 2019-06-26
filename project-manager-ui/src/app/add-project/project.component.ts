import {Component, OnInit} from '@angular/core';
import { ProjectModel } from '../model/project.model';
import { AppService } from '../service/app.service';


@Component({
    selector:'project',
    templateUrl: './project.component.html',
    styleUrls : ['./project.component.scss']
})
export class ProjectComponent implements OnInit{
    project : ProjectModel;
    projectList : ProjectModel[];

    ngOnInit(){
        this.getAllProject();
    }

    getAllProject(){
        this._appService.getProjects()
        .subscribe(res => {
        this.projectList = res.outData;
        console.log("from add User component:"+this.projectList);
        });
    }
    
    constructor(private _appService: AppService) { 
        this.project = new ProjectModel();    
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