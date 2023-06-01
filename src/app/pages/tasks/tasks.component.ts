import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TaskService } from 'src/app/core/services/task/task.service';
import { TaskModel } from 'src/app/core/types/task/task.dto';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  private originTasks: TaskModel[] = []
  private query = ''
  tasks: TaskModel[] = []
  searchFormControl = new UntypedFormControl('')
  constructor (
    private taskService: TaskService
  ) {
    this.originTasks = taskService.tasks
    this.tasks = this.originTasks
    this.taskService.tasks$.subscribe(tasks => {
      this.originTasks = tasks
      this.updateTasks()
    })
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe((query) => {
        this.query = query
        this.updateTasks()
      })
  }

  updateTasks () {
    const { query } = this
    this.tasks = this.originTasks
      .filter(task => 
        task.name.includes(query) ||
        task.description.includes(query) ||
        task.title.includes(query)
      )
  }
}
