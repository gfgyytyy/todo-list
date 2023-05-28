import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SnackBarComponent } from 'src/app/custom-material/snack-bar/snack-bar.component'

export enum SnackBarType {
  INFO = 'info',
  WARN = 'error',
  ERROR = 'cancel',
  SUCCESS= 'check_circle'
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor (private snackBar: MatSnackBar) { }

  public openErrorSnack (data: any | string) {
    this.openSnackBar(data, SnackBarType.ERROR)
  }

  public openInfoSnack (data: any | string) {
    this.openSnackBar(data, SnackBarType.INFO)
  }

  public openWarnSnack (data: any | string) {
    this.openSnackBar(data, SnackBarType.WARN)
  }

  public openSuccessSnack (data: any | string) {
    this.openSnackBar(data, SnackBarType.SUCCESS)
  }

  public openSnackBar (
    data: any | string,
    type: SnackBarType = SnackBarType.INFO,
  ) {
    let message = ''
    if (typeof data === 'object') {
      if (data.message) {
        message = data.message
      } else {
        message = JSON.stringify(data)
      }
    } else {
      message = data.toString()
    }
    console.log(message)
    this.snackBar.openFromComponent(
      SnackBarComponent,
      {
        data: {
          message,
          icon: type,
        },
        duration: 5000,
        panelClass: ['snack-bar', type],
      },
    )
  }
}
