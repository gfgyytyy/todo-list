import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks.routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TasksComponent],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    TasksRoutingModule,
  ]
})
export class TasksModule { }
