import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { matDialogRefMock } from "../mat-dialogs.mock";
import { TaskFormDialogComponent } from "./task-form-dialog.component";
import { generateRandomTask } from "src/app/utils/random/random-task";

describe('TaskFormDialog', () => {
  let component: TaskFormDialogComponent;
  let fixture: ComponentFixture<TaskFormDialogComponent>;
  let dialogRefMock: MatDialogRef<any, any>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFormDialogComponent],
      imports: [ 
        MatDialogModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: MatDialogRef,
          useValue: matDialogRefMock,
        }
      ]
    })
    fixture = TestBed.createComponent(TaskFormDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    dialogRefMock = TestBed.inject(MatDialogRef)
  })

  it('should create successfully', () => {
    expect(component).toBeTruthy()
  })

  it('should call close with false when call dismiss', () => {
    component.onDismiss()
    expect(matDialogRefMock.close).toHaveBeenCalledWith()
    expect(matDialogRefMock.close).toHaveBeenCalled()
  })

  it('should call close with true when call dismiss', () => {
    const mockTask = generateRandomTask()
    component.onSubmit(mockTask)
    expect(matDialogRefMock.close).toHaveBeenCalledWith(mockTask)
    expect(matDialogRefMock.close).toHaveBeenCalled()
  })

})