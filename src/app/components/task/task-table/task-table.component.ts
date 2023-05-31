import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TaskService } from 'src/app/core/services/task/task.service';
import { TaskModel } from 'src/app/core/types/task/task.dto';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnChanges, AfterViewInit {
  @Input() tasks: TaskModel[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<TaskModel>([...this.tasks])

  constructor (
    private dialogService: DialogService,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {

  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const taskChanges = changes['tasks']
    if(taskChanges){
      this.dataSource.data = [...taskChanges.currentValue]
    }
  }

  get displayedColumns () {
    return [
      'name',
      'progress',
      'createdAt',
      'dueDate',
      'actions',
    ]
  }

  onEdit (value: TaskModel) {
    this.dialogService
      .openTaskForm(value)
      .subscribe({
        next: (task) =>{
          if(task) this.taskService.updateTask(value, task)
        },
        error: (error) => {
          this.notificationService.openErrorSnack(error)
        }
      })
  }

  onDone (value: TaskModel) {
    this.taskService.finishTask(value)
  }

  onDelete (value: TaskModel) {
    this.dialogService
      .openConfirm(
        `Are you sure you want to delete ${value.name}?`,
        'Confirming delete'
      )
      .pipe(
        filter(e => e)
      )
      .subscribe({
        next: () => {
          this.taskService.deleteTask(value.key)
        },
        error: (error) => {
          this.notificationService.openErrorSnack(error)
        }
      })
  }
}
