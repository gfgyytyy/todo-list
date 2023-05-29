import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { TaskModel } from 'src/app/core/types/task/task.dto';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskFormDialogComponent, TaskFormDialogModel } from '../../dialogs/task-form-dialog/task-form-dialog.component';
import { filter } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TaskService } from 'src/app/core/services/task/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task?: TaskModel

  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()
  @Output() done = new EventEmitter()

  constructor (
  ) {}

  get hourUntilDue () {
    if(this.task == undefined) return -1
    return moment(new Date()).diff(this.task.dueDate, 'hour')
  }

  getCardStyle () {
    let color = ''
    if(this.hourUntilDue < 24) {
      color = 'rgba(255,0,0,0.3)'
    }
    if(this.task?.progress === 100) {
      color = 'rgba(0,255,0,0.3)'
    }
    return {
      backgroundColor: color
    }
  }

  onEdit (value: TaskModel) {
    this.edit.emit(value)
  }

  onDelete (value: TaskModel) {
    this.delete.emit(value)
  }

  onDone (value: TaskModel) {
    this.done.emit(value)
  }
}
