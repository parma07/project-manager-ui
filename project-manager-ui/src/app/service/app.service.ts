
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TaskModel } from '../model/Task.model';
import { ResponseModel } from '../model/response.model';
import { TaskConstant } from '../constants/task.constants';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from '../model/user.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AppService {
    constructor(private _httpClient: HttpClient) { }

    private handleError(error: HttpErrorResponse) {
      return throwError(
        'Something bad happened; please try again later.');
    };

    public getTasks(): Observable<any> {      
      return this._httpClient.post<ResponseModel<TaskModel>>("api/pm/task/getTasks", httpOptions).pipe(
      tap((res: ResponseModel<TaskModel>) => console.log(`added task w/ id=${res.status}`)),
      catchError(this.handleError));  
    }

    public saveTask(task: TaskModel): Observable<any> {    
      return this._httpClient.post<TaskModel>("api/pm/task/saveTask", task, httpOptions).pipe(
        tap((task: TaskModel) => console.log(`added task w/ id=${task.taskName}`)),
        catchError(this.handleError));            
      }

    public saveUser(user : UserModel): Observable<any> {
      return this._httpClient.post<UserModel>("api/pm/user/saveUser", user, httpOptions).pipe(
        tap((user: UserModel) => console.log(`added user w/ employeeId=${user.employeeId}`)),
        catchError(this.handleError));
    } 

    public getUsers(): Observable<any>{
      return this._httpClient.post<ResponseModel<UserModel>>("api/pm/user/getUsers", httpOptions).pipe(
        tap((res: ResponseModel<UserModel>) => console.log(`het user list`)),
        catchError(this.handleError));
    }


}
