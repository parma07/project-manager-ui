import {Component, OnInit} from '@angular/core';
import { UserModel } from '../model/user.model';
import { AppService } from '../service/app.service';


@Component({
    selector:'user',
    templateUrl: './user.component.html',
    styleUrls : ['./user.component.scss']
})
export class UserComponent implements OnInit{
    user : UserModel;

    ngOnInit(){}

    constructor(private _appService: AppService) { 
    this.user = new UserModel();    
    }

    public saveOrUpdateUser() : void{        
        console.log("User Form Submitted"+this.user.employeeId);
        this._appService.saveUser(this.user).subscribe(res => {

        });
    }

    public reset():void{
        console.log("User Form reset");
        this.user.firstName='';
        this.user.lastName='';
        this.user.employeeId='';
       
      }

}