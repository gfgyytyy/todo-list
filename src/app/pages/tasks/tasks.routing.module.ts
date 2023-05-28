import { RouterModule, Routes } from "@angular/router";
import { TasksComponent } from "./tasks.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TasksComponent },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule { }
