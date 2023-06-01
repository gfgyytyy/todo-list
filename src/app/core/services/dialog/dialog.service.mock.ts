import { DialogService } from "./dialog.service";

export const dialogServiceMock = jasmine.createSpyObj<DialogService>([
  'openConfirm',
  'openTaskForm'
])
