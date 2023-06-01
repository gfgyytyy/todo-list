import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { TaskModel } from 'src/app/core/types/task/task.dto';

export const OVER_DUE_TASK_BACKGROUND_COLOR = 'rgba(255,0,0,0.3)'
export const COMPLETE_TASK_BACKGROUND_COLOR = 'rgba(0,255,0,0.3)'

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

  get hourFromDue () {
    if(this.task == undefined) return -1
    return moment(new Date()).diff(this.task.dueDate, 'hour')
  }

  get cardStyle () {
    let color = ''
    if(this.hourFromDue > 0) {
      color = OVER_DUE_TASK_BACKGROUND_COLOR
    }
    if(this.task?.progress === 100) {
      color = COMPLETE_TASK_BACKGROUND_COLOR
    }
    return {
      backgroundColor: color
    }
  }
}
