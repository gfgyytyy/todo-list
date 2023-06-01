import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TaskListComponent } from './task-list.component'
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module'
import { TaskService } from 'src/app/core/services/task/task.service'
import { taskServiceMock } from 'src/app/core/services/task/task.service.mock'
import { generateRandomTask } from 'src/app/utils/random/random-task'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { dialogServiceMock } from 'src/app/core/services/dialog/dialog.service.mock'
import { of, throwError } from 'rxjs'

describe('TaskListComponent', () => {
  let component: TaskListComponent
  let fixture: ComponentFixture<TaskListComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [
        CustomMaterialModule,
      ],
      providers: [
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
        {
          provide: DialogService,
          useValue: dialogServiceMock
        },
      ]
    })
    fixture = TestBed.createComponent(TaskListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should edit task', () => {
    const mockTask = generateRandomTask()
    dialogServiceMock.openTaskForm.and.returnValue(of(mockTask))
    taskServiceMock.updateTask.and.returnValue([mockTask])
    
    component.onEdit(mockTask)
    expect(dialogServiceMock.openTaskForm).toHaveBeenCalled()
    expect(taskServiceMock.updateTask).toHaveBeenCalled()
    expect(taskServiceMock.updateTask).toHaveBeenCalledWith(mockTask, mockTask)
    
  })


  it('should done task', () => {
    const mockTask = generateRandomTask()
    taskServiceMock.finishTask.and.returnValue([mockTask])
    
    component.onDone(mockTask)
    expect(taskServiceMock.finishTask).toHaveBeenCalled()
    
  })

  it('should delete task', () => {
    const mockTask = generateRandomTask()
    taskServiceMock.deleteTask.and.returnValue()
    dialogServiceMock.openConfirm.and.returnValue(of(true))
    
    component.onDelete(mockTask)
    expect(taskServiceMock.deleteTask).toHaveBeenCalled()
    
  })
})
