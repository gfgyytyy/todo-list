import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { matDialogRefMock } from "../mat-dialogs.mock";

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefMock: MatDialogRef<any, any>
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
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
          useValue: matDialogRefMock
        }
      ]
    })
    fixture = TestBed.createComponent(ConfirmDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    dialogRefMock = TestBed.inject(MatDialogRef)
  })

  it('should create successfully', () => {
    expect(component).toBeTruthy()
  })

  it('should call close with false when call dismiss', () => {
    
    component.onDismiss()
    expect(matDialogRefMock.close).toHaveBeenCalledWith(false)
    expect(matDialogRefMock.close).toHaveBeenCalled()
  })

  it('should call close with true when call dismiss', () => {
    component.onConfirm()
    expect(matDialogRefMock.close).toHaveBeenCalledWith(true)
    expect(matDialogRefMock.close).toHaveBeenCalled()
  })

})