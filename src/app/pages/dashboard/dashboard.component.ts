import { Component } from '@angular/core';
import * as moment from 'moment';
import { TaskService } from 'src/app/core/services/task/task.service';
import { TaskModel } from 'src/app/core/types/task/task.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private allTasks: TaskModel[] = []
  constructor (
    private taskService: TaskService
  ) {
    this.allTasks = taskService.tasks
    this.taskService.tasks$.subscribe(tasks => {
      this.allTasks = tasks
    })
  }

  get taskGroup () {
    const groups: {
      name: string,
      tasks: TaskModel[]
    }[] = []
    groups.push({
      name: 'recent',
      tasks: this.allTasks.filter(e => moment().diff(e.createdAt, 'hour') < 2),
    })
    groups.push({
      name: 'due at today',
      tasks: this.allTasks.filter(e => moment().diff(e.dueDate, 'hour') <= 24),
    })
    groups.push({
      name: 'uncompleted',
      tasks: this.allTasks.filter(e => e.progress < 100),
    })
    groups.push({
      name: 'completed',
      tasks: this.allTasks.filter(e => e.progress === 100),
    })
    groups.push({
      name: 'all tasks',
      tasks: [...this.allTasks],
    })
    return groups
  }
}
