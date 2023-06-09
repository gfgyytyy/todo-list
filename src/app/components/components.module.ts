import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TaskCardComponent } from './task/task-card/task-card.component'
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { TaskListComponent } from './task/task-list/task-list.component'
import { PipesModule } from '../shared/pipes/pipes.module';
import { TaskFormComponent } from './task/task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavListComponent } from './layout/sidenav-list/sidenav-list.component';
import { RouterModule } from '@angular/router';
import { TaskFormDialogComponent } from './dialogs/task-form-dialog/task-form-dialog.component';
import { TaskTableComponent } from './task/task-table/task-table.component';



@NgModule({
  declarations: [
    TaskCardComponent,
    TaskListComponent,
    TaskFormComponent,
    ConfirmDialogComponent,
    LayoutComponent,
    SidenavListComponent,
    TaskFormDialogComponent,
    TaskTableComponent,
  ],
  exports: [
    TaskCardComponent,
    TaskListComponent,
    LayoutComponent,
    SidenavListComponent,
    TaskTableComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    CustomMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
})
export class ComponentsModule { }
