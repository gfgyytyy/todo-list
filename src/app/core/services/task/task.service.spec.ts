import { TestBed } from '@angular/core/testing'

import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { matDialogMock } from 'src/app/components/dialogs/mat-dialogs.mock'
import { of } from 'rxjs'
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component'
import { TASK_STORAGE_KEY, TaskService } from './task.service'
import { generateRandomTask } from 'src/app/utils/random/random-task'

describe('TaskService', () => {
  let service: TaskService
  let localStorageMock: any = {};
  
  beforeEach(() => {
    TestBed.configureTestingModule({
    })
    service = TestBed.inject(TaskService)
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });
  
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });
  })

  it('should create successfully', () => {
    expect(service).toBeTruthy()
  })

  it('should create successfully', () => {
    localStorageMock[TASK_STORAGE_KEY] = []
    service = TestBed.inject(TaskService)
    expect(service).toBeTruthy()
  })

  it('should create task', () => {
    const mockTask = generateRandomTask()
    service.createTask(mockTask)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('should finish task', () => {
    const mockTask = generateRandomTask()
    service.tasks$.next([mockTask])
    const tasks = service.finishTask(mockTask)
    const [task] = tasks || []
    expect(task?.progress).toEqual(100)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('should fail to delete task', () => {
    const mockTask = generateRandomTask()
    service.tasks$.next([mockTask])
    service.deleteTask(mockTask.key)
    expect(localStorage.setItem).toHaveBeenCalled()
  })

  it('should create task when update key not found', () => {
    const mockTask = generateRandomTask()
    const newTask = {
      ...mockTask,
      name: `${mockTask.name}-update`
    }
    service.updateTask(mockTask, newTask)
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(service.tasks.length).toEqual(1)
    expect(service.tasks[0].key).toEqual(newTask.key)
  })

  it('should throw error when input is not json', () => {
    // @ts-ignore
    const result = service.parseRawJson('', [])
    expect(result).toEqual([])
  })

})
