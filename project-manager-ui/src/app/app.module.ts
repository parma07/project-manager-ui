import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from'@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent} from './view-task/view-task.component';
import { UserComponent } from './add-user/user.component';
import { ProjectComponent } from './add-project/project.component';
import { AppService } from './service/app.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ViewTaskPipe } from './filter/view-task.pipe';
import { SearchFilterPipe } from './shared/search-by.pipe';
import { SortByPipe } from './shared/sort-by.pipe';


@NgModule({
  declarations: [
    AppComponent, AddTaskComponent, ViewTaskComponent, UserComponent,SortByPipe,SearchFilterPipe,ProjectComponent, ViewTaskPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
