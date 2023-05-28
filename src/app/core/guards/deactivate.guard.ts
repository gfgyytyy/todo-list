import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { CanDeactivate } from '@angular/router'
import { map, Observable } from 'rxjs'
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component'

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  constructor (
    private dialog: MatDialog,
  ) {}

  canDeactivate (component: ComponentCanDeactivate): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate()
      ? true
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      : this.openDialog()
  }

  openDialog () {
    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogModel, boolean>(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: '有尚未儲存的改動',
        title: '是否要離開',
      },
    })
    return dialogRef.afterClosed().pipe(map((e) => {
      if (e === undefined) return false
      return e
    }))
  }
}
