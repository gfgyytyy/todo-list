import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, filter, map } from "rxjs";
import { ConfirmDialogComponent, ConfirmDialogModel } from "src/app/components/dialogs/confirm-dialog/confirm-dialog.component";
import { TaskFormDialogComponent, TaskFormDialogModel } from "src/app/components/dialogs/task-form-dialog/task-form-dialog.component";
import { TaskModel } from "../../types/task/task.dto";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor (
    private matDialog: MatDialog
  ) {

  }

  openConfirm (message: string, title: string): Observable<boolean> {
    return this.matDialog.open<
      ConfirmDialogComponent,
      ConfirmDialogModel,
      boolean
    >(
      ConfirmDialogComponent,
      {
        data: {
          title,
          message,
        },
        disableClose: true,
      }
    )
      .afterClosed()
      .pipe(
        map((e) => {
          if (e === undefined) return false
          return e
        })    
      )
  }

  openTaskForm (value?: TaskModel): Observable<TaskModel | undefined> {
    const dialogRef = this.matDialog.open<
      TaskFormDialogComponent,
      TaskFormDialogModel,
      TaskModel
    >(
      TaskFormDialogComponent,
      {
        width: '40%',
        minWidth: '300px',
        data: {
          task: value,
        }
      }
    )
    return dialogRef
      .afterClosed()
  }
}