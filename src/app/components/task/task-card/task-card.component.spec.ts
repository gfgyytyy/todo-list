import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMPLETE_TASK_BACKGROUND_COLOR, OVER_DUE_TASK_BACKGROUND_COLOR, TaskCardComponent } from './task-card.component';
import { generateRandomTask } from 'src/app/utils/random/random-task';
import * as moment from 'moment';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCardComponent]
    });
    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should return diff between due date and now', () => {
    expect(component.hourFromDue).toEqual(-1)
    const mockTask = generateRandomTask()
    component.task = mockTask
    const hours = moment()
      .diff(moment(mockTask.dueDate), 'hour')
    expect(component.hourFromDue).toEqual(hours)
  })

  it('should return card style with completed status', () => {
    const mockTask = {
      ...generateRandomTask(),
      progress: 100,
    }
    component.task = mockTask
    expect(component.cardStyle).toEqual({
      backgroundColor: COMPLETE_TASK_BACKGROUND_COLOR
    })
  })

  it('should return card style with over due status', () => {
    const mockTask = {
      ...generateRandomTask(),
      dueDate: new Date(1900).toISOString(),
    }
    component.task = mockTask
    expect(component.cardStyle).toEqual({
      backgroundColor: OVER_DUE_TASK_BACKGROUND_COLOR
    })
  })
  
})
