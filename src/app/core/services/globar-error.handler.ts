import { ErrorHandler, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { NotificationService } from './notification/notification.service'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor (
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  handleError (error: any) {
    this.notificationService.openErrorSnack(error.message)
  }
}
