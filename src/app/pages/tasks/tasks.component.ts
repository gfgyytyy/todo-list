import { Component } from '@angular/core';
import { TaskService } from 'src/app/core/services/task/task.service';
import { TaskModel } from 'src/app/core/types/task/task.dto';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  allTasks: TaskModel[] = []
  constructor (
    private taskService: TaskService
  ) {
    this.allTasks = taskService.tasks
    this.taskService.tasks$.subscribe(tasks => {
      this.allTasks = tasks
    })
  }
}
