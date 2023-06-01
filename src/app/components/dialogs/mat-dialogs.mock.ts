import { MatDialog, MatDialogRef } from "@angular/material/dialog";

export const matDialogRefMock = jasmine.createSpyObj<MatDialogRef<any, any>>([
  'close',
])

export const matDialogMock = jasmine.createSpyObj<MatDialog>([
  'open',
])