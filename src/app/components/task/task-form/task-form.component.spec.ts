import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TaskFormComponent } from './task-form.component'
import { generateRandomTask } from 'src/app/utils/random/random-task'

describe('TaskFormComponent', () => {
  let component: TaskFormComponent
  let fixture: ComponentFixture<TaskFormComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent]
    })
    fixture = TestBed.createComponent(TaskFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should patch value when props changed', () => {
    fixture.detectChanges()
    component.value = undefined
    spyOn(component.form, 'patchValue')
    const mockTask = generateRandomTask()
    component.value = mockTask
    component.ngOnChanges({
      value: {
        currentValue: mockTask,
        previousValue: undefined,
        firstChange: false,
        isFirstChange: function (): boolean {
          return true
        }
      }
    })
    expect(component.form.patchValue).toHaveBeenCalled()
    expect(component.form.patchValue).toHaveBeenCalledWith(mockTask)
  })

  it('should pass form validation', () => {
    spyOn(component.submitted, 'emit');
    const mockTask = generateRandomTask()
    const mockFormValue = {
      name: mockTask.name,
      title: mockTask.title,
      description: mockTask.description,
      progress: mockTask.progress,
      dueDate: mockTask.dueDate,
    }
    component.form.setValue(mockFormValue)
    component.submit()
    
    expect(component.form.valid).toBeTrue()
    expect(component.submitted.emit).toHaveBeenCalled()
    expect(component.submitted.emit).toHaveBeenCalledWith(mockFormValue)
  })

  it('should invalid when validators not passed', () => {
    component.form.patchValue({
      name: undefined,
    })
    expect(component.isInvalid('name')).toBeTrue()
  })

})
