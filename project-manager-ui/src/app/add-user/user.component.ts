import {Component, OnInit} from '@angular/core';
import { UserModel } from '../model/user.model';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';
import { SearchFilter } from '../model/search-filter.model';


@Component({
    selector:'user',
    templateUrl: './user.component.html',
    styleUrls : ['./user.component.scss']
})
export class UserComponent implements OnInit{
    searchFilter: SearchFilter = new SearchFilter();    
    sortingName: string;
    isDesc: boolean;
    user : UserModel;
    userList : UserModel[];
    alert: any = {
        type: 'success',
        msg: '',
        timeout: 5000
      };

    ngOnInit(){
        this.getAllUser();
    }

    getAllUser(){
        this._appService.getUsers()
        .subscribe(res => {
        this.userList = res.outData;
        //console.log("from add User component:"+this.userList);
        });
    }
    
    constructor(private _appService: AppService, private router: Router) { 
    this.user = new UserModel();    
    }

    public saveOrUpdateUser() : void{        
        //console.log("User Form Submitted"+this.user.employeeId);
        this._appService.saveUser(this.user).subscribe(res => {
            this.alert.msg= res.status;            
        });
        //this.getAllUser();
        this.router.navigate(['user']);
    }

    public reset():void{
        //console.log("User Form reset");
        this.user.firstName='';
        this.user.lastName='';
        this.user.employeeId='';
        this.alert.msg= '';
       
    }

    public availableForEdit(userId : string):void{
        //console.log("userid for edit:"+userId);
        this.user=this.userList.find(u => u.userId==userId);
    }

    sort(name: string): void {
        if (name && this.sortingName !== name) {
            this.isDesc = false;
          } else {
            this.isDesc = !this.isDesc;
          }
          this.sortingName = name;
      }

}