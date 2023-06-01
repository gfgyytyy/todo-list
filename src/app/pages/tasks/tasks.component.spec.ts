import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing'

import { TasksComponent } from './tasks.component'
import { TaskService } from 'src/app/core/services/task/task.service'
import { taskServiceMock } from 'src/app/core/services/task/task.service.mock'
import { generateRandomTask } from 'src/app/utils/random/random-task'
import { BehaviorSubject, Subject } from 'rxjs'
import { TaskModel } from 'src/app/core/types/task/task.dto'

describe('TasksComponent', () => {
  let component: TasksComponent
  let fixture: ComponentFixture<TasksComponent>
  let localStorageMock: any = {}
  let service: TaskService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent
      ],
    })
    
    fixture = TestBed.createComponent(TasksComponent)
    component = fixture.componentInstance
    service = TestBed.inject(TaskService)
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });
  
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should update tasks when task service has new tasks', () => {
    const mockTask = generateRandomTask()
    service.updateTask(mockTask, mockTask)
    expect(component.tasks.length).toEqual(1)
    expect(component.tasks[0].key).toEqual(mockTask.key)
  })

  it('should update search query when input', fakeAsync(() => { 
    const dummy = [
      generateRandomTask(),
      generateRandomTask(),
      generateRandomTask(),
    ]
    service.tasks$.next(dummy)
    const query = dummy[0].name
    component.searchFormControl.patchValue(query)
    tick(400)
    expect(component.tasks.length).toEqual(1)
    
  }))
})
