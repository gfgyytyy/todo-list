import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskModel } from 'src/app/core/types/task/task.dto';
import { TaskFormDialogComponent } from '../../dialogs/task-form-dialog/task-form-dialog.component';
import { filter } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: TaskModel[] = []
  constructor (
    private notificationService: NotificationService,
    private taskService: TaskService,
    private dialogService: DialogService,
  ) {
    this.tasks = taskService.tasks
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks
    })
  }

  onEdit (value: TaskModel) {
    this.dialogService
      .openTaskForm(value)
      .subscribe({
        next: (task) =>{
          if(task) this.taskService.updateTask(value.key, task)
        },
        error: (error) => {
          this.notificationService.openErrorSnack(error)
        }
      })
  }

  onDelete (value: TaskModel) {
    this.dialogService
      .openConfirm(
        `Are you sure you want to delete ${value.name}?`,
        'Confirming delete'
      )
      .pipe(
        filter(e => e)
      )
      .subscribe(() => {
        this.taskService.deleteTask(value.key)
      })
  }
}