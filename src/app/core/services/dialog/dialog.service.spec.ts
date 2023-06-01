import { TestBed } from '@angular/core/testing'

import { DialogService } from 'src/app/core/services/dialog/dialog.service'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { matDialogMock } from 'src/app/components/dialogs/mat-dialogs.mock'
import { of } from 'rxjs'
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component'

describe('DialogService', () => {
  let service: DialogService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: MatDialog,
          useValue: matDialogMock
        }
      ]
    })
    service = TestBed.inject(DialogService)
  })

  it('should open confirm dialog', () => {
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(true)
    } as MatDialogRef<typeof ConfirmDialogComponent>)
    service
      .openConfirm('', '')
      .subscribe((result) => {
        expect(result).toBeTrue()
      })
    expect(matDialogMock.open).toHaveBeenCalled()
  })

  it('should return false when open confirm dialog dismissed', () => {
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(undefined)
    } as MatDialogRef<typeof ConfirmDialogComponent>)
    service
      .openConfirm('', '')
      .subscribe((result) => {
        expect(result).toBeFalse()
      })
    expect(matDialogMock.open).toHaveBeenCalled()
  })

  it('should open task form', () => {
    matDialogMock.open.and.returnValue({
      afterClosed: () => of(undefined)
    } as MatDialogRef<typeof ConfirmDialogComponent>)
    service
      .openTaskForm()
      .subscribe((result) => {
        expect(result).toEqual(undefined)
      })
    expect(matDialogMock.open).toHaveBeenCalled()
  })
})
