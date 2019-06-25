import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserComponent } from './add-user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'/viewtask',pathMatch: 'full'},
// {path:'/taskmanager', component:AppComponent},
  {path:'addtask',component:AddTaskComponent},
  {path:'viewtask',component:ViewTaskComponent},
  {path:'user',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
