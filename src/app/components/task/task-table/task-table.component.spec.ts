import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TaskTableComponent } from './task-table.component'
import { CustomMaterialModule } from 'src/app/custom-material/custom-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { generateRandomTask } from 'src/app/utils/random/random-task'
import { dialogServiceMock } from 'src/app/core/services/dialog/dialog.service.mock'
import { taskServiceMock } from 'src/app/core/services/task/task.service.mock'
import { of } from 'rxjs'
import { TaskService } from 'src/app/core/services/task/task.service'
import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'

describe('TaskTableComponent', () => {
  let component: TaskTableComponent
  let fixture: ComponentFixture<TaskTableComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTableComponent],
      imports: [
        CustomMaterialModule,
        BrowserAnimationsModule,
        PipesModule,
      ],
      providers: [
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
        {
          provide: DialogService,
          useValue: dialogServiceMock,
        }
      ]
    })
    fixture = TestBed.createComponent(TaskTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should edit task', () => {
    const mockTask = generateRandomTask()
    dialogServiceMock.openTaskForm.and.returnValue(of(mockTask))
    taskServiceMock.updateTask.and.returnValue([])
    
    component.onEdit(mockTask)
    expect(dialogServiceMock.openTaskForm).toHaveBeenCalled()
    expect(taskServiceMock.updateTask).toHaveBeenCalled()
    expect(taskServiceMock.updateTask).toHaveBeenCalledWith(mockTask, mockTask)
    
  })


  it('should done task', () => {
    const mockTask = generateRandomTask()
    taskServiceMock.finishTask.and.returnValue([])
    
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


  it('should update data source data when props changed', () => {
    fixture.detectChanges()
    component.tasks = []
    const mockTasks = [generateRandomTask()]
    component.tasks = mockTasks
    component.ngOnChanges({
      tasks: {
        currentValue: mockTasks,
        previousValue: [],
        firstChange: false,
        isFirstChange: function (): boolean {
          return false
        }
      }
    })
    expect(component.dataSource.data).toEqual(mockTasks)
  })
})
