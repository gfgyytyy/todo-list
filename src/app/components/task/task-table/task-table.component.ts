import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TaskModel } from 'src/app/core/types/task/task.dto';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnChanges, AfterViewInit {
  @Input() tasks: TaskModel[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<TaskModel>([...this.tasks])

  ngAfterViewInit(): void {
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
    ]
  }
}
