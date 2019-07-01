
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TaskModel } from '../model/Task.model';
import { ResponseModel } from '../model/response.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from '../model/user.model';
import { ProjectModel } from '../model/project.model';
import { ParentTaskModel } from '../model/parent-task.model';

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

    public getAllParentTasks(): Observable<any> {      
      return this._httpClient.post<ResponseModel<ParentTaskModel>>("/api/pm/parenttask/getParentTasks", httpOptions).pipe(
      tap((res: ResponseModel<ParentTaskModel>) => console.log(`added task w/ id=${res.status}`)),
      catchError(this.handleError));  
    }



    public saveTask(task: TaskModel): Observable<any> {    
      return this._httpClient.post<TaskModel>("api/pm/task/saveTask", task, httpOptions).pipe(
        tap((task: TaskModel) => console.log(`added task w/ id=${task.taskName}`)),
        catchError(this.handleError));            
      }

    public saveUser(user : UserModel): Observable<any> {
      return this._httpClient.post<UserModel>("api/pm/user/saveUser", user, httpOptions).pipe(
        tap((user: UserModel) => console.log(`added user w/ employeeId=${user.firstName}`)),
        catchError(this.handleError));
    } 

    public getUsers(): Observable<any>{
      return this._httpClient.post<ResponseModel<UserModel>>("api/pm/user/getUsers", httpOptions).pipe(
        tap((res: ResponseModel<UserModel>) => console.log(`get user list`)),
        catchError(this.handleError));
    }

    public saveProject(project : ProjectModel): Observable<any> {
      return this._httpClient.post<ProjectModel>("api/pm/project/saveProject", project, httpOptions).pipe(
        tap((project: ProjectModel) => console.log(`added project w/ project=${project.project}`)),
        catchError(this.handleError));
    } 

    public getProjects(): Observable<any>{
      return this._httpClient.post<ResponseModel<ProjectModel>>("api/pm/project/getProjects", httpOptions).pipe(
        tap((res: ResponseModel<ProjectModel>) => console.log(`get rpoject list`)),
        catchError(this.handleError));
    }

    public getAllUsersWithNoProject(): Observable<any>{
      return this._httpClient.post<ResponseModel<UserModel>>("api/pm/user/getUsersWithNoProject", httpOptions).pipe(
        tap((res: ResponseModel<UserModel>) => console.log(`Get Users with No Project`)),
        catchError(this.handleError));
    }


}
