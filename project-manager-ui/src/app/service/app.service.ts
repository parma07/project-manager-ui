
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TaskModel } from '../model/Task.model';
import { ResponseModel } from '../model/response.model';
import { TaskConstant } from '../constants/task.constants';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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
      return this._httpClient.post<ResponseModel<TaskModel>>("api/taskmanager/getTasks", httpOptions).pipe(
      tap((res: ResponseModel<TaskModel>) => console.log(`added task w/ id=${res.status}`)),
      catchError(this.handleError));  
    }

    public saveTask(task: TaskModel): Observable<any> {        
      return this._httpClient.post<TaskModel>("api/taskmanager/saveTask", task, httpOptions).pipe(
        tap((task: TaskModel) => console.log(`added task w/ id=${task.taskName}`)),
        catchError(this.handleError));            
      }


}
