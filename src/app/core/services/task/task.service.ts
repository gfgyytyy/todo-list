import { Inject, Injectable } from '@angular/core'
import { map, Observable, Subject } from 'rxjs'
import { TaskModel } from '../../types/task/task.dto'

const TASK_STORAGE_KEY = 'tasks'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks$ = new Subject<TaskModel[]>()
  private _tasks: TaskModel[] = []
  constructor () {    
    const item = localStorage.getItem(TASK_STORAGE_KEY)
    this.tasks$.subscribe((value) => {
      this.tasks = value
    })
    if(item){
      const tasks = this.parseRawJson(item, [])
      this.tasks$.next(tasks)
    }else {
      this.tasks$.next([])
    }
  }

  private set tasks (value: TaskModel[]) {
    this._tasks = [...value]
  }

  get tasks () {
    return [...this._tasks]
  }

  createTask (value: TaskModel, key: string = this.calculateKey()) {
    const newTask: TaskModel = {
      ...value,
      key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const newTasks = [...this.tasks, newTask]
    this.storeTasks(newTasks)
  }

  updateTask (
    oldValue: TaskModel,
    value: TaskModel
  ) {
    const { key } = oldValue
    const newTasks = this.tasks
    const updated = Object.assign(oldValue, value)
  

    const oldTaskIndex = newTasks.findIndex(e => e.key === key)
    if(oldTaskIndex === -1){
      this.createTask(value, key)
      return
    }
    newTasks[oldTaskIndex] = {
      ...updated,
      updatedAt: new Date().toISOString(),
    }
    this.storeTasks(newTasks)
  }

  deleteTask (key: string) {
    const newTasks = this.tasks
    const oldTaskIndex = newTasks.findIndex(e => e.key === key)
    if(oldTaskIndex !== -1){
      newTasks.splice(oldTaskIndex, 1)
      this.storeTasks(newTasks)
    }
  }

  
  private storeTasks (tasks: TaskModel[]) {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
    this.tasks$.next(tasks)
  }

  private calculateKey () {
    return Math.floor(Math.random() * 10000000).toString().padStart(8, '0')
  }

  private parseRawJson (raw: string, initValue: {} | []) {
    try {
      return JSON.parse(raw)
    }catch(error) {
      console.error(error)
    }
    return initValue
  }
}
