import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core'
import { Subscription } from 'rxjs'

import { SpinnerService } from '../../core/services/spinner.service'
import { UntypedFormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { TaskService } from 'src/app/core/services/task/task.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  opened = false

  constructor (
    public spinnerService: SpinnerService,
    private dialogService: DialogService,
    private taskService: TaskService,
    private router: Router,
  ) {
  }

  backToHome () {
    this.router.navigateByUrl('/')
      .catch(error => {
        console.log(error)
      })
  }

  addTask () {
    this.dialogService
      .openTaskForm()
      .subscribe({
        next: (value) => {
          if(value) this.taskService.createTask(value)
        }
      })
  }
}
