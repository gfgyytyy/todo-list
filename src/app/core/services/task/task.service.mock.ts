import { TaskService } from "./task.service";

export const taskServiceMock = jasmine.createSpyObj<TaskService>( 
  [
    'createTask',
    'finishTask',
    'updateTask',
    'deleteTask',
    'tasks$',
  ],
)