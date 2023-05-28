import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from 'src/app/core/types/task/task.dto';
import { TaskFormComponent } from '../../task/task-form/task-form.component';
import { filter } from 'rxjs';

export interface TaskFormDialogModel {
  task?: TaskModel
}

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-dialog.component.html',
  styleUrls: ['./task-form-dialog.component.css']
})
export class TaskFormDialogComponent {
  @ViewChild('taskForm') taskForm?:TaskFormComponent
  constructor (
    private dialogRef: MatDialogRef<TaskFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskFormDialogModel
  ) {
    this.dialogRef
      .beforeClosed()
      .pipe(
        filter((e) => {
          console.log(e)
          return this.taskForm?.form.dirty || false
        })
      )

  }

  onSubmit (value?: TaskModel): void {
    this.dialogRef.close(value)
  }

  onDismiss (): void {
    this.dialogRef.close()
  }
}

